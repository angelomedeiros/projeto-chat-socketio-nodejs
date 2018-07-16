const Rooms = require('./../../schemas/rooms')

module.exports = (req, res) => {
  req.body.slug = req.body.name.toLowerCase().replace(/ /g, '-')

  if (req.body.enable) {
    req.body.enable = false
  } else {
    req.body.enable = true
  }

  Rooms.create(req.body)
       .then( room => {
          return res.redirect('/rooms')
       })
       .catch( error => {
         return res.send('Error: ' + error)
       })
}