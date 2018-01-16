import { URL_CFG } from '@/api'

export default class Monitor {
  constructor(Http) {
    return {
      detail: () => {
        return Http.get(URL_CFG.api + 'detail')
      },
      rs_statics: () => {
        return Http.get(URL_CFG.api + 'rs_statics')
      },
      topN: params => {
        return Http.get(
          URL_CFG.api + `topN/${params.metric}/${params.num || 5}`
        )
      }
    }
  }
}
