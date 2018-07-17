var express = require('express')

const router = express.Router()
router.get('/', require('./find'))

module.exports = router