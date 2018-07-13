module.exports = (req, res, next) => {
  req.checkBody('name', 'O campo name é obrigatorio')
     .notEmpty()
  req.checkBody('email', 'O campo name é obrigatorio')
     .notEmpty()
     .isEmail()
  req.checkBody('password', 'O campo name é obrigatorio')
     .notEmpty()

  let errors = req.validationErrors()

  if ( !errors ) {
    return next()
  }

  return res.redirect('/users/new')
}