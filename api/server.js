/* global require */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var uuidv4 = require('uuid/v4');
var rooms = {}

function createRoom(name) {
  return {
    id: uuidv4(),
    name: name,
    msgs: []
  }
}

io.on('connection', function(socket) {
  console.log('user connected');
  io.emit('rooms', rooms);

  socket.on('join room', function(room) {
    socket.join(room);
    io.emit('joined room', rooms[room]);
    console.log('user connected to room: ' + room);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('create room', function(name) {
    let room = createRoom(name);
    rooms[room.id] = room;
    io.emit('rooms', rooms);
    console.log('criando room ' + name);
  });

  socket.on('message', function({roomID, msg} = {}) {
    io.to(roomID).emit('message', msg);
    rooms[roomID].msgs.push(msg);
    console.log('message: ' + msg + ' to room: ' + roomID);
  });

});

http.listen(3001, function() {
  console.log('listening on *:3001');
});