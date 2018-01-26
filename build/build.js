'use strict'

const chalk = require('chalk')
const ora = require('ora')
const path = require('path')
const rm = require('rimraf')
const shell = require('shelljs')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')

const platform = process.platform
const spinner = ora(`building for ${platform} production...`)
spinner.start()

rm('/dist', err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    const outputName = platform === 'win32' ? 'dashboard.exe' : 'dashboard'
    shell.cd(path.resolve(__dirname, '../src/backend'))
    shell.exec(`go build -o ../../dist/cloud-monitor/${outputName}`, {silent: true}, function (code, stdout, stderr) {
      if (stats.hasErrors() || code !== 0) {
        console.log(chalk.red(
          `  Exit code: ${code}\n` +
          `  Program stderr:\n    ${stderr}\n` +
          `  Build failed with errors.\n`
        ))
        process.exit(1)
      }

      shell.cp(path.resolve(__dirname, '../src/backend/locale_conf.json'), path.resolve(__dirname, '../dist/cloud-monitor/'))
      shell.cp(path.resolve(__dirname, '../src/backend/portal.ini'), path.resolve(__dirname, '../dist/cloud-monitor/'))

      console.log(chalk.cyan('  Build complete.\n'))
    })
  })
})
