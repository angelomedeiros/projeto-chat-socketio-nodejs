module.exports = (req, res, next) => {
  req.checkParams('id', 'O campo id é obrigatorio')
     .notEmpty()
     .isMongoId()

  let errors = req.validationErrors()

  if ( !errors ) {
    return next()
  }

  return res.redirect('/users')
}