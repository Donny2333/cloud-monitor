const express = require('express')
const router = express.Router()
const controller = require('../controller')

router.get('/topN/:metric/:num', controller.topN)
router.get('/detail', controller.detail)
router.get('/rs_statics', controller.rsStatics)

module.exports = router
