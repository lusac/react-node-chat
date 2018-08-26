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

  socket.on('join channel', function(channelID) {
    socket.join(channelID);
    socket.emit('joined channel', channels[channelID]);
    console.log('user connected to channel: ' + channelID);
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

  // socket.on('set username', function(nickname) {
  //   socket.nickname = nickname;
  //   console.log('settings username: ' + nickname);
  // });
});

http.listen(3001, function() {
  console.log('listening on *:3001');
});