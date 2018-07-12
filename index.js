// var http = require('http')

// http
//   .createServer( (req, res) => {
//     res.writeHead( 200, { 'Content-type': 'text/plain' } )
//     res.end( 'Hello world!' )
//   })
//   .listen(3000)

// console.log('Server started!')

var express = require('express')
var app = express()

app.get('/', (req, res) => {
  res.json({
    menu: {
      id: 1,
      value: '1',
      nome: 'Angelo Medeiros',
      msg: 'Hello world!'
    }
  })
  // res.send('hello world')
})

// app.listen(3000) Isso já irá fazer funcionar!!
var port = 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})