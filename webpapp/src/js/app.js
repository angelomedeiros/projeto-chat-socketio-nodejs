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

    var getUsers = function () {
      return $.get('http://localhost:3000/users', data => {
        if (!data.status) {
          return 
        }

        var users = data && data.users
        users.forEach((user,index) => {
          var userTemplate = '<li class="list-group-item user" user="' + user._id + '" username="' + user.name + '"> '+ user.name +' </li>'
          $('.messages').append(userTemplate)          
        })
      })
    }

    getRooms()
    getUsers()
  })()

  var socket = io('//localhost:3000')
  var currentRoom = undefined
  var currentUser = undefined

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

  $('.messages').on('click', '.user',function (e) {
    var username = $(this).attr('username')
    var user = $(this).attr('user')

    socket.emit('join user', {
      userId: user,
      username
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

      if (!currentRoom) {
        socket.emit('message user', {
          message,
          user: currentUser
        })
      } 

      if (currentRoom)  {
        socket.emit('message room', {
          message,
          room: currentRoom
        })        
      }

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

  socket.on('joined user', data => {
    currentUser = data.user
    $('.username').html('@' + data.username)
    $('.chatbox').show()
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

  socket.on('messaged', data => {
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



