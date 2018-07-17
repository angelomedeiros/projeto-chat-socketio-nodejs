module.exports = (req, res) => {
  res.render('main/index', {
    title: 'Hi, User!',
    user_logged: req.user
  })
}