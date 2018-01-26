const ip = require('ip')
const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf')

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(devMiddleware)
app.use(hotMiddleware)
app.use(express.static(path.join(__dirname, '../static')))

const uri = 'http://localhost:3000'

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  opn(uri).then(_ => {
    console.log('> Listening at ' + uri + '\n')
  }, _ => {
    console.log('> Cannot open window but server for http://' + ip.address() + ':3000' + '\n')
  })
})
app.listen(3000)
