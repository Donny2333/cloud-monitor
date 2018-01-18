const express = require('express')
const router = express.Router()
const render = require('../controller').render

router.get('/', render.echo)

module.exports = router
