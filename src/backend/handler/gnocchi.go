package handler

import (
  "fmt"
  "strconv"
  "encoding/json"
  "net/http"
  "bytes"
  "io/ioutil"

  "github.com/fiberhome/cloud-monitor/src/backend/ini"
  "github.com/fiberhome/cloud-monitor/src/backend/gjson"
)

type Ops_paras struct {
  Userid    string `json:"userid" description:"identifier of the user"`
  Password  string `json:"password"`
  Projectid string `json:"projectid"`
  Domainid  string `json:"domainid"`
  Token     string `json:"token"`
}

type Gnocchi struct {
  //topN_metric map[string]usage_metrics
  //details detail_cloud_static
  ids Ops_paras
}

type RSCount struct {
  Local_mb       int64 `json:"local_gb"`
  Local_mb_used  int64 `json:"local_gb_used"`
  Memory_mb      int64 `json:"memory_mb"`
  Memory_mb_used int64 `json:"memory_mb_used"`
  Vcpus          int   `json:"vcpus"`
  Vcpus_used     int   `json:"vcpus_used"`
}

func get_urls() (string, string, string, error) {
  iniPortal, err := ini.LoadConfiguration("portal.ini")
  if err != nil {
    //
    return "", "", "", err
  }

  vip := iniPortal.StringFromSection("openstack", "vip", "")
  keystone_port := iniPortal.StringFromSection("openstack", "keystone", "")
  nova_port := iniPortal.StringFromSection("openstack", "nova", "")
  gnocchi_port := iniPortal.StringFromSection("openstack", "gnocchi", "")

  if vip == "" || keystone_port == "" || nova_port == "" || gnocchi_port == "" {
    return "", "", "", err
  }

  url_auth := fmt.Sprintf("http://%s:%s/v3/auth/tokens", vip, keystone_port)
  url_nova := fmt.Sprintf("http://%s:%s", vip, nova_port)
  url_gnocchi := fmt.Sprintf("http://%s:%s", vip, gnocchi_port)
  return url_auth, url_nova, url_gnocchi, err
}

func (gno Gnocchi) get_token(ids Ops_paras) (string, error) {
  s := fmt.Sprintf(`{"auth": {"identity": {"methods": ["password"],"password": {
        "user": {"id":"%s", "password": "%s"}}},
        "scope":{"project": {"domain": {"name": "%s"},"id": "%s"}}}
        }`, ids.Userid, ids.Password, ids.Domainid, ids.Projectid)

  data := []byte(s)
  body := bytes.NewReader(data)
  authUrl, _, _, err := get_urls()
  if err != nil {
    return "", err
  }

  resp, err := http.Post(authUrl, "application/json;charset=utf-8", body)
  if err != nil {
    return "", err
  }

  out := resp.Header.Get("X-Subject-Token")
  fmt.Println("token:", out)
  return out, err
}

func (gno Gnocchi) getTopN(metric string, number string) (int, string) {
  if gno.ids.Userid == "" {
    return -1, ""
  }
  num, err := strconv.Atoi(number)
  if err != nil {
    panic(err)
    return -1, ""
  }

  ret, out := gno.getGnocchiTopN(gno.ids.Token, metric, num)

  if ret == 401 {
    gno.ids.Token, _ = gno.get_token(gno.ids)
    ret, out = gno.getGnocchiTopN(gno.ids.Token, metric, num)
  }

  return ret, out
}

func (gno Gnocchi) getGnocchiTopN(token string, metric string, num int) (int, string) {
  _, _, gnoUrl, err := get_urls()
  if err != nil {
    return -1, ""
  }

  gnoTopNUrl := fmt.Sprintf("%s/v1/topn?num=%d&metric=%s", gnoUrl, num, metric)
  fmt.Println("url:", gnoTopNUrl)
  fmt.Println("token:", token)
  client := &http.Client{}
  request, err := http.NewRequest("GET", gnoTopNUrl, nil)
  request.Header.Set("X-Auth-Token", token)
  response, _ := client.Do(request)

  body, err := ioutil.ReadAll(response.Body)
  if err != nil {
    // handle error
  }
  status := response.StatusCode
  fmt.Println("return: ", string(body))

  jsonStr := string(body)
  jsonTopN := ""
  name := gjson.Get(jsonStr, `topn`)
  lenTopn := len(name.Array())
  i := 0
  maxValue := 0.00
  for i < lenTopn {
    indexStrValue := fmt.Sprintf("topn.%d.resource_data.metric_value", i)
    indexStrHost := fmt.Sprintf("topn.%d.resource_data.name", i)

    if !gjson.Get(jsonStr, indexStrHost).Exists() {
      return status, ""
    }

    hostName := gjson.Get(jsonStr, indexStrHost).String()
    valueMetric := gjson.Get(jsonStr, indexStrValue).Float()
    jsonTemp := fmt.Sprintf(`{"name":"%s", "value":%f}`, hostName, valueMetric)
    if jsonTopN != "" {
      jsonTopN = jsonTopN + ",\n" + jsonTemp
    } else {
      jsonTopN = jsonTemp
      maxValue = valueMetric
    }

    i = i + 1
  }

  jsonOutput := fmt.Sprintf(`{"result":[%s], "max":%f}`, jsonTopN, maxValue)
  fmt.Println(jsonStr)

  return status, jsonOutput
}

func (gno Gnocchi) getHostStatics(rscount *RSCount) (int, error) {
  _, novaUrl, _, err := get_urls()
  if err != nil {
    return -1, err
  }

  novaUrl = novaUrl + "/v2.1/" + gno.ids.Projectid + "/os-hypervisors/statistics"
  fmt.Println(novaUrl)

  client := &http.Client{}
  request, err := http.NewRequest("GET", novaUrl, nil)
  request.Header.Set("X-Auth-Token", gno.ids.Token)
  response, _ := client.Do(request)

  body, err := ioutil.ReadAll(response.Body)
  if err != nil {
    // handle error
  }
  status := response.StatusCode
  fmt.Println(string(body))
  countJson := gjson.Get(string(body), `hypervisor_statistics`)
  err = json.Unmarshal([]byte(countJson.String()), rscount)
  (*rscount).Local_mb = (*rscount).Local_mb * 1024
  (*rscount).Local_mb_used = (*rscount).Local_mb_used * 1024
  fmt.Println((*rscount).Vcpus)

  return status, err
}

func (gno Gnocchi) getStatics(rscount *RSCount) int {
  if gno.ids.Userid == "" {
    return -1
  }

  ret, err := gno.getHostStatics(rscount)

  if err != nil {
    return -1
  }

  if ret == 401 {
    gno.ids.Token, _ = gno.get_token(gno.ids)
    ret, err = gno.getHostStatics(rscount)
  }

  return ret
}

func (gno Gnocchi) getDetail() (int, string) {
  if gno.ids.Userid == "" {
    return -1, ""
  }

  ret, jsonStr := gno.getHostDetail(gno.ids.Token)

  if ret == 401 {
    gno.ids.Token, _ = gno.get_token(gno.ids)
    ret, jsonStr = gno.getHostDetail(gno.ids.Token)
  }

  return ret, jsonStr
}

func (gno Gnocchi) getHostDetail(token string) (int, string) {
  /*detail := new(Detail_cloud)
  detail.servername = "hahah"
  detail.cloud_score = 34
  (*out).detail_clouds["hehe"] = *detail*/
  _, _, gnoUrl, err := get_urls()
  if err != nil {
    return -1, ""
  }

  gnoTopNUrl := fmt.Sprintf("%s/v1/all_measures", gnoUrl)
  client := &http.Client{}
  request, err := http.NewRequest("GET", gnoTopNUrl, nil)
  request.Header.Set("X-Auth-Token", token)
  response, _ := client.Do(request)

  fmt.Println("url:", gnoTopNUrl)
  fmt.Println("token:", token)

  body, err := ioutil.ReadAll(response.Body)
  if err != nil {
    // handle error
  }
  status := response.StatusCode
  jsonStr := string(body)

  fmt.Println("return:", string(body))

  jsonState := ""
  num_excellent := 0
  num_good := 0
  num_poor := 0
  var sum int
  name := gjson.Get(jsonStr, `measures`)
  sum = len(name.Array())
  fmt.Println("detail debug sum", sum)
  if (!name.Exists() || sum == 0) {
    return status, ""
  }

  i := 0
  for i < sum {
    hostStr := fmt.Sprintf("measures.%d.resource_data.name", i)
    memUsedStr := fmt.Sprintf("measures.%d.resource_data.measures.hardware\\.memory\\.used", i)
    memTotalStr := fmt.Sprintf("measures.%d.resource_data.measures.hardware\\.memory\\.total", i)
    cpuUtilStr := fmt.Sprintf("measures.%d.resource_data.measures.hardware\\.cpu\\.util", i)
    loadStr := fmt.Sprintf("measures.%d.resource_data.measures.hardware\\.cpu\\.load\\.5min", i)

    hostname := gjson.Get(jsonStr, hostStr).String()
    memUsed := gjson.Get(jsonStr, memUsedStr).Int()
    memTotal := gjson.Get(jsonStr, memTotalStr).Int()
    cpuUtil := gjson.Get(jsonStr, cpuUtilStr).Float()
    load := gjson.Get(jsonStr, loadStr).Float()

    fmt.Println("detail debug", hostname, memUsed, memTotal, cpuUtil, load)
    if !gjson.Get(jsonStr, hostStr).Exists() || !gjson.Get(jsonStr, memUsedStr).Exists() ||
      !gjson.Get(jsonStr, memTotalStr).Exists() || !gjson.Get(jsonStr, cpuUtilStr).Exists() ||
      !gjson.Get(jsonStr, loadStr).Exists() {
      return status, ""
    }
    if memTotal == 0 {
      memTotal = 1
    }
    score := float64(100) - float64(memUsed/memTotal)*10 - cpuUtil*5 - load/100*5
    if score >= 90 {
      num_excellent = num_excellent + 1
    } else if score >= 70 {
      num_good = num_good + 1
    } else {
      num_poor = num_poor + 1
    }

    jsonTemp := fmt.Sprintf(`{"name":"%s", "score":%d}`, hostname, int(score))
    if jsonState != "" {
      jsonState = jsonState + ",\n" + jsonTemp
    } else {
      jsonState = jsonTemp
    }
    fmt.Println(jsonState)

    i = i + 1
  }

  system_score := float64(100) - float64(num_excellent/sum)*3 - float64(num_good/sum)*5 - float64(num_poor/sum)*10
  jsonOutput := fmt.Sprintf(`{"result":{"sum":%d, "system_score" : %d, "num_excellent" :%d,
					"num_good":%d, "num_poor":%d, "details":[%s]}}`, sum, int(system_score), int(num_excellent),
    int(num_good), int(num_poor), jsonState)

  fmt.Println("getHostDetail: ", jsonOutput)
  return status, jsonOutput
}

func (gno Gnocchi) set_ops_ids(ids Ops_paras) {
  gno.ids.Projectid = ids.Projectid
  gno.ids.Password = ids.Password
  gno.ids.Userid = ids.Userid
  gno.ids.Domainid = ids.Domainid

  fmt.Println("test", gno.ids.Projectid, gno.ids.Password, gno.ids.Userid, gno.ids.Domainid)
}
