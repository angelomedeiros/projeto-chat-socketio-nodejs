const Users = require('./../../schemas/users')

module.exports = (req, res) => {
  Users.find()
       .then( users => {
          return res.render('users/index', {
            title: 'AngeloChat',
            users,
            user_logged: req.user
          })
       })
       .catch( error  => {
        return res.send('Error: ' + error)
       })
}