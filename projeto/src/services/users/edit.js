const Users =  require('./../../schemas/users')

module.exports = (req, res) => {
  Users.findById(req.params.id)
       .then( user => {
         if ( !user ) {
          return res.sendStatus( 404 )
         }
         return res.render('users/edit', {
          title: 'AngeloChat - edit',
          user,
          user_logged: req.user
         })
       })
       .catch( error => {
         return res.send('Error: ' + error)
       })
}