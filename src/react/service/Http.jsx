import axios from 'axios'

class Http {
  constructor() {
    this.baseUrl = ''
  }
  get(url, params) {
    return axios.get(this.baseUrl + url, {
      params
    })
  }
  post(url, data) {
    return axios.post(this.baseUrl + url, {
      data
    })
  }
}

module.exports = new Http()
