/* global require */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// var rooms = []

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('room', function(room) {
    socket.join(room);
    console.log('user connected to room: ' + room);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('message', function({room, msg} = {}) {
    console.log('message: ' + msg + ' to room: ' + room);
    io.to(room).emit('message', msg);
  });

});

http.listen(3001, function() {
  console.log('listening on *:3001');
});