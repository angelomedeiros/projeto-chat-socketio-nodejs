const express     = require('express')
const router      = express.Router()

const isLoggedIn  = require('./../../middleware/isloggedin')
const createRules = require('./../validator/rooms/create')
const editRules   = require('./../validator/rooms/edit')
const removeRules = require('./../validator/rooms/remove')
const updateRules = require('./../validator/rooms/update')

router.get('/', isLoggedIn,                      require('./../../services/rooms/index'))
router.get('/new', isLoggedIn,                   require('./../../services/rooms/new'))
router.get('/edit/:slug', editRules, isLoggedIn, require('./../../services/rooms/edit'))
router.get('/:id', isLoggedIn,                   require('./../../services/rooms/show'))
router.post('/', createRules, isLoggedIn,        require('./../../services/rooms/create'))
router.put('/:id', updateRules, isLoggedIn,      require('./../../services/rooms/update'))
router.patch('/:id', updateRules,                require('./../../services/rooms/update'))
router.delete('/:id', removeRules, isLoggedIn,   require('./../../services/rooms/remove'))

module.exports = router