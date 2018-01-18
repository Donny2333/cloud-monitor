const express = require('express')
const router = express.Router()
const handler = require('../controller').handler

router.get('/topN/:metric/:num', handler.topN)
router.get('/detail', handler.detail)
router.get('/rs_statics', handler.rsStatics)

module.exports = router
