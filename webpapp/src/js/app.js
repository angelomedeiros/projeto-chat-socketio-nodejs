$(document).ready(() => {
  (function() {
    var getRooms = () => {
      return $.get('http://localhost:3000/rooms', data => {
        if (!data.status) {
          return
        }

        var rooms = data && data.rooms
        var titleTemplate = 
              ' <li class="list-group-item title"> ' +
              '   <h4>Canais (' + rooms.length + ')</h4> ' +
              ' </li> '

        $('.channels').append(titleTemplate)

        rooms.forEach((room, index) => {
          var roomTemplate = ' <li class="list-group-item channel" channel="' + room._id + '"><i class="fa fa-comment-o"></i> ' + room.name + ' </li> '
          $('.channels').append(roomTemplate)
        })

      })
    }

    getRooms()
  })()

  var socket = io('//localhost:3000')
  var currentRoom = undefined

  $('.channels').on('click', '.channel', function (e) {
    var roomId = $(this).attr('channel')

    console.log(roomId)

    socket.emit('join room', {
      room: roomId
    })

    return false
  })

  socket.on('joined room', data => {
    currentRoom = data.room
    console.log('Joined: ' + currentRoom)
  })

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
})



