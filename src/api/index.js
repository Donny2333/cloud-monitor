const prodURL = ''
const devURL = 'http://10.127.3.38:8088/'
const Urls = {
  Prod_Cfg: {
    api: prodURL + 'apis/monitor/v1.0/'
  },
  Dev_Cfg: {
    api: devURL + 'monitor/v1.0/'
  }
}

export const URL_CFG = Urls.Dev_Cfg
