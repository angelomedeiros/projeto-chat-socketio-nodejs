const bodyParser       = require('body-parser')
const expressSession   = require('express-session')
const expressValidator = require('express-validator')
const hbs              = require('express-hbs')
const methodOverride   = require('method-override')
const morgan           = require('morgan')
const path             = require('path')
const express          = require('express')

module.exports = (app) => {
  app.set('port', 8000)
  app.set('host', '127.0.0.1')
  app.set('views', path.join(__dirname, './../../../dist/views'))
  app.set('view engine', 'hbs')
  app.set('assets', path.join(__dirname, './../../../dist'))

  app.use(express.static(app.get('assets')))
  app.use(morgan('combined'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(methodOverride('_method'))
  app.use(expressSession({
    secret: '61d5234$#%#$@5655[32445',
    resave: false,
    saveUninitialized: false
  }))
  app.use(expressValidator())

  app.engine('hbs', hbs.express4({
    defaultLayout: path.join(app.get('views'), 'layouts/main.hbs'),
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutsDir: path.join(app.get('views'), 'layouts')
  }))
}