const express     = require('express')
const router      = express.Router()

const createRules = require('./../validator/users/create')
const editRules = require('./../validator/users/edit')
const removeRules = require('./../validator/users/remove')
const updateRules = require('./../validator/users/update')

router.get('/',                    require('./../../services/users/index'))
router.get('/new',                 require('./../../services/users/new'))
router.get('/edit/:id', editRules, require('./../../services/users/edit'))
router.get('/:id',                 require('./../../services/users/show'))
router.post('/', createRules,      require('./../../services/users/create'))
router.put('/:id', updateRules,    require('./../../services/users/update'))
router.patch('/:id', updateRules,  require('./../../services/users/update'))
router.delete('/:id', removeRules, require('./../../services/users/remove'))

module.exports = router