const path = require('path')
const loadIniFile = require('read-ini-file')

const config = loadIniFile.sync(path.join(__dirname, '../portal.ini'))['openstack']

class Url {
  constructor() {
    this.auth = `http://${config.vip}:${config.keystone}/v3/auth/tokens`
    this.nova = `http://${config.vip}:${config.nova}`
    this.gnocchi = `http://${config.vip}:${config.gnocchi}`
  }
}

module.exports = Url
