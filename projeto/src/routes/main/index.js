const express    = require('express')
const isLoggedIn = require('./../../middleware/isloggedin')
const router     = express.Router()

router.get('/', isLoggedIn, require('./../../services/main'))

module.exports = router