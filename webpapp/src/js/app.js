var socket = io('//localhost:3000')

$('#message').keypress( e => {
  if (e.which == 13) {
    var val = $('#message').val()
    console.log('Val ' + val)

    socket.emit('message', {
      message: val
    })

    e.preventDefault() // ou return false
  }
})
