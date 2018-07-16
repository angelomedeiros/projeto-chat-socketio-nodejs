const Rooms = require('./../../schemas/rooms')

module.exports = (req, res) => {

  if (!req.body.enable) {
    req.body.enable = false
  } else {
    req.body.enable = true
  }

  Rooms
    .findByIdAndUpdate(req.params.id, req.body)
    .then( room => {
      return res.redirect('/rooms')
    })
    .catch( error => {
      return res.send('Error: ' + error)
    })
}