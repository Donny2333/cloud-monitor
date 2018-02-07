const rp = require('request-promise')

export default class Http {
  constructor() {
    this.baseUrl = ''
  }
  get(url, params) {
    return rp.get({
      url: this.baseUrl + url,
      params
    })
  }
}
