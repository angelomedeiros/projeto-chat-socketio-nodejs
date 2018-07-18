var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')

// var indexRouter = require('./routes');
// var usersRouter = require('./routes/users');

var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.io = io
  next()
})

var sockets = io.sockets

sockets.on('connection', (socket) => {
  console.log('Conexão bem sucedida')

  socket.on('message room', data => {
    // console.log('Dado recebido: ' + data.message)
    socket.broadcast.in(data.room).emit('message room', {
      message: data.message.toUpperCase(),
      room: data.room
    })
  })

  socket.on('join room', data => {
    socket.room = data.room
    socket.join(socket.room)

    socket.emit('joined room', data)
  })

  socket.on('leave room', function(data) {
    socket.leave(data.room)
    socket.room = ''
    socket.emit('leaved room', true)
  })

})

require('./routes')(app)

mongoose.connect('mongodb://127.0.0.1:27017/chatangelo')

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
  app,
  server
};
