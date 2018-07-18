$(document).ready(() => {
  (function() {
    $('.chatbox').hide()
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
          var roomTemplate = ' <li class="list-group-item channel" name="' + room.name + '" channel="' + room._id + '"><i class="fa fa-comment-o"></i> ' + room.name + ' </li> '
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
    var roomName = $(this).attr('name')

    // console.log(roomName)

    socket.emit('join room', {
      room: roomId,
      roomName
    })

    $('.conversation').html('')

    return false
  })

  $('#btn_leave').on('click', function (e) {
    var roomId = $(this).attr('channel')

    socket.emit('leave room', {
      room: roomId
    })

    return false
  })

  $('#message').on('keypress', e => {
    if (e.which == 13 || e.keyCode == 13) {
      var message = $('#message').val()
      // console.log('Val ' + message)
      if (!message) {
        return
      }

      socket.emit('message room', {
        message,
        room: currentRoom
      })

      var messageTempĺate = 
        ' <div class="col-xs-12 message"> ' + 
        '   <div class="avatar col-xs-6 col-md-1"> ' +
        '     <h2>A</h2> ' +
        '   </div> ' +
        '   <p class="text col-xs-6 col-md-11">' + message + '</p> ' +
        ' </div> '

      $('.conversation').append(messageTempĺate)
      $('#message').val('')

      e.preventDefault() // ou return false
    }
  })

  socket.on('joined room', data => {
    currentRoom = data.room
    // console.log('Joined: ' + currentRoom)
    $('.username').html('@' + data.roomName)
    $('.chatbox').show()
  })

  socket.on('leaved room', function(data) {
    currentRoom = undefined
    $('.chatbox').hide()
    $('.conversation').html('')
  })

  socket.on('message room', data => {
    if (!data.message) {
      return
    }

    var messageTempĺate = 
      ' <div class="col-xs-12 message"> ' + 
      '   <div class="avatar col-xs-6 col-md-1"> ' +
      '     <h2>A</h2> ' +
      '   </div> ' +
      '   <p class="text col-xs-6 col-md-11">' + data.message + '</p> ' +
      ' </div> '

    $('.conversation').append(messageTempĺate)
  })
})



