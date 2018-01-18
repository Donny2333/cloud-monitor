const request = require('request')
const config = require('../config')
const Token = require('./token')
const Url = require('./url')

const tk = new Token()
const url = new Url()

class Gnocchi {
  constructor() {
    this.UserID = config.UserID
    this.Password = config.Password
    this.ProjectID = config.ProjectID
    this.DomainName = config.DomainName
  }

  statics(token) {
    return new Promise((resolve, reject) => {
      request.get({
        url: `${url.nova}/v2.1/${this.ProjectID}/os-hypervisors/statistics`,
        json: true,
        headers: {
          'X-Auth-Token': token
        }
      }, (err, res, body) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }

  getStatics() {
    return new Promise((resolve, reject) => {
      this.statics(tk.token).then(res => {
        if (res.statusCode === 401) {
          // generate token when unauthorized
          tk.generate().then(token => {
            this.statics(token).then(res => {
              resolve(res.body)
            }, err => {
              reject(err)
            })
          })
        } else {
          resolve(res.body)
        }
      }, err => {
        reject(err)
      })
    })
  }
}

module.exports = Gnocchi
