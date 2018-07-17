const Users = require('./../../schemas/users')

module.exports = (req, res) => {
  let user = new Users()

  return res.render('users/create', {
    title: 'users page',
    user,
    user_logged: req.user
  })
}