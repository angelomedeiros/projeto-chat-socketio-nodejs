module.exports = (req, res, next) => {
  if (req.user) {
    console.log(req.user)
    return next()
  }
  return res.redirect('/login')
}