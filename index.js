var http = require('http')

http
  .createServer( (req, res) => {
    res.writeHead( 200, { 'Content-type': 'text/plain' } )
    res.end( 'Hello world!' )
  })
  .listen(3000)

console.log('Server started!')