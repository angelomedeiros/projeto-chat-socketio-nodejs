const express     = require('express')
const router      = express.Router()

const createRules = require('./../validator/rooms/create')
const editRules = require('./../validator/rooms/edit')
const removeRules = require('./../validator/rooms/remove')
const updateRules = require('./../validator/rooms/update')

router.get('/',                      require('./../../services/rooms/index'))
router.get('/new',                   require('./../../services/rooms/new'))
router.get('/edit/:slug', editRules, require('./../../services/rooms/edit'))
router.get('/:id',                   require('./../../services/rooms/show'))
router.post('/', createRules,        require('./../../services/rooms/create'))
router.put('/:id', updateRules,      require('./../../services/rooms/update'))
router.patch('/:id', updateRules,    require('./../../services/rooms/update'))
router.delete('/:id', removeRules,   require('./../../services/rooms/remove'))

module.exports = router