const express = require('express')
const router = express.Router()
const controller = require('../controller')

router.get('/', controller.echo)
  .post('/', controller.msg)

module.exports = router
