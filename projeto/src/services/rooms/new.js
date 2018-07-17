const Rooms = require('./../../schemas/rooms')

module.exports = (req, res) => {
  let room = new Rooms()
  return res.render('rooms/create', {
    title: 'Rooms - chatschool admin',
    room,
    user_logged: req.user
  })
}