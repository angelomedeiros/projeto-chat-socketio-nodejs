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

socket.on('message', data => {
  var template = 
    ' <div class="col-xs-12 message"> ' + 
    '   <div class="avatar col-xs-6 col-md-1"> ' +
    '     <h2>A</h2> ' +
    '   </div> ' +
    '   <p class="text col-xs-6 col-md-11">' + data.message + '</p> ' +
    ' </div> '

  $('.conversation').append(template)
})
