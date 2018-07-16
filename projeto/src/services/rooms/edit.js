const Rooms = require('./../../schemas/rooms')

module.exports = (req, res) => {
  Rooms
    .findOne({
      slug: req.params.slug
    })
    .then( room => {
      if (!room) {
        return res.sendStatus(404).end()
      }
      return res.render('rooms/edit', {
        title: 'Rooms edit',
        room
      })
    })
    .catch( error => {
      return res.send('Error: ' + error)
    })
}