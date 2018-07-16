const Rooms = require('./../../schemas/rooms')

module.exports = (req, res) => {
  Rooms
    .findByIdAndRemove(req.params.id)
    .then( room => {
      res.redirect('/rooms')
    })
    .catch( error => {
      return res.send('Error: ' + error)
    })
}