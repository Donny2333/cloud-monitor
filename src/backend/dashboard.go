// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

import (
  "fmt"
  "log"
  "net/http"
  "os"

  "github.com/fiberhome/cloud-monitor/src/backend/handler"
  "github.com/fiberhome/cloud-monitor/src/backend/ini"
)

func main() {
  // Set logging output to standard console out
  log.SetOutput(os.Stdout)

  iniPortal, err := ini.LoadConfiguration("portal.ini")
  if err != nil {
    log.Fatal(err)
  }

  iport := iniPortal.IntegerFromSection("monitor.js.js", "port", 9090)
  ip := iniPortal.StringFromSection("monitor.js.js", "ip", "0.0.0.0")

  apiHandler, err := handler.CreateHTTPAPIHandler()
  if err != nil {
    log.Fatal(err)
  }
  // Run a HTTP server that serves static public files from './public' and handles API calls.
  http.Handle("/", handler.MakeGzipHandler(handler.CreateLocaleHandler()))
  http.Handle("/monitor_api/", apiHandler)
  http.Handle("/monitor_api/appConfig.json", handler.AppHandler(handler.ConfigHandler))

  // Listen for http or https
  log.Printf("ip:%s", ip)
  log.Printf("Serving insecurely on HTTP : port: %d", iport)
  addr := fmt.Sprintf("%s:%d", ip, iport)
  go func() { log.Fatal(http.ListenAndServe(addr, nil)) }()

  select {}
}
