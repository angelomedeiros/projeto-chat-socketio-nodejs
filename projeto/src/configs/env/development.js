const bodyParser       = require('body-parser')
const express          = require('express')
const expressSession   = require('express-session')
const expressValidator = require('express-validator')
const hbs              = require('express-hbs')
const methodOverride   = require('method-override')
const mongoose         = require('mongoose')
const morgan           = require('morgan')
const path             = require('path')

module.exports = (app) => {
  app.set('port', 9000)
  app.set('host', '127.0.0.1')
  app.set('views', path.join(__dirname, './../../../build/views'))
  app.set('view engine', 'hbs')
  app.set('assets', path.join(__dirname, './../../../build'))
  app.set('mongo_host', '127.0.0.1')
  app.set('mongo_port', 27017)
  app.set('mongo_db', 'chatangelo')
  app.set('mongo_url', `mongodb://${app.get('mongo_host')}:${app.get('mongo_port')}/${app.get('mongo_db')}`)

  app.use(express.static(app.get('assets')))
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(methodOverride('_method'))
  app.use(expressSession({
    secret: '&8&6asdgbu77as_=-asddas{}',
    resave: false,
    saveUninitialized: false
  }))
  app.use(expressValidator())

  app.engine('hbs', hbs.express4({
    defaultLayout: path.join(app.get('views'), 'layouts/main.hbs'),
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutsDir: path.join(app.get('views'), 'layouts')
  }))

  mongoose.connect(app.get('mongo_url'))
}