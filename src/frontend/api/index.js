const prodURL = ''
const devURL = 'http://10.127.1.32:9091/'
const testURL = 'http://192.168.130.11:9091/'
const Urls = {
  Prod_Cfg: {
    api: prodURL + 'monitor_api/v1/'
  },
  Dev_Cfg: {
    api: devURL + 'monitor_api/v1/'
  },
  Test_Cfg: {
    api: testURL + 'monitor_api/v1/'
  }
}

export const ENV = process.env.NODE_ENV
export const URL_CFG = ENV === 'production' ? Urls.Prod_Cfg : Urls.Dev_Cfg
