import { URL_CFG } from '@/api'

export default class Monitor {
  constructor(Http) {
    return {
      rs_statics: () => {
        return Http.get(URL_CFG.api + 'rs_statics')
      }
    }
  }
}
