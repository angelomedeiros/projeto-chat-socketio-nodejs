const Users = require('./../../schemas/users')

module.exports = (req, res) => {
  Users.find()
       .then( users => {
          return res.render('users/index', {
            title: 'AngeloChat',
            users
          })
       })
       .catch( error  => {
        return res.send('Error: ' + error)
       })
}