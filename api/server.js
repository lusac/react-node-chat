/* global require */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var uuidv4 = require('uuid/v4');
var channels = {}

function createChannel(name) {
  return {
    id: uuidv4(),
    name: name,
    msgs: []
  }
}

io.on('connection', function(socket) {
  console.log('user connected');
  io.emit('channels', channels);

  socket.on('join channel', function(channel) {
    socket.join(channel);
    io.emit('joined channel', channels[channel]);
    console.log('user connected to channel: ' + channel);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('create channel', function(name) {
    let channel = createChannel(name);
    channels[channel.id] = channel;
    io.emit('channels', channels);
    console.log('criando channel ' + name);
  });

  socket.on('message', function({channelID, msg} = {}) {
    io.to(channelID).emit('message', msg);
    channels[channelID].msgs.push(msg);
    console.log('message: ' + msg.text + ' from: ' + msg.username + ' to channel: ' + channelID);
  });

});

http.listen(3001, function() {
  console.log('listening on *:3001');
});