const prodURL = ''
const devURL = 'http://10.127.1.32:9091/'
const Urls = {
  Prod_Cfg: {
    api: prodURL + 'monitor_api/v1/'
  },
  Dev_Cfg: {
    api: devURL + 'monitor_api/v1/'
  }
}

export const ENV = window.env
export const URL_CFG = ENV === 'product' ? Urls.Prod_Cfg : Urls.Dev_Cfg
