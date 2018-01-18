const response = require('request')
const config = require('../config')
const Url = require('./url')

class Token {
  constructor() {
    this.generate()
  }

  generate() {
    const url = new Url()
    return new Promise((resolve, reject) => {
      response.post({
        url: url.auth,
        json: true,
        body: {
          auth: {
            identity: {
              methods: ['password'],
              password: {
                user: {
                  id: config.UserID,
                  password: config.Password
                }
              }
            },
            scope: {
              project: {
                domain: {
                  name: config.DomainName
                },
                id: config.ProjectID
              }
            }
          }
        }
      }, (err, resp, body) => {
        if (err) {
          reject(err)
        } else {
          this.token = resp.headers['x-subject-token']
          resolve(this.token)
        }
      })
    })
  }
}

module.exports = Token
