module.exports = app => {
  app.get('/', require('./routes/main'))
}