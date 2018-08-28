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

  socket.on('get channel', function(channelID) {
    let channel = channels[channelID];
    channel.joined = false;
    if (socket.rooms[channelID]) {
      channel.joined = true;
    }
    socket.emit('got channel', channel);
    console.log('got spying channel: ' + channelID);
  });

  socket.on('join channel', function(channelID) {
    var channel = channels[channelID];
    channel.joined = true;
    socket.join(channelID);
    socket.emit('joined channel', channel);
    console.log('user connected to channel: ' + channelID);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('create channel', function(name) {
    let channel = createChannel(name);
    channels[channel.id] = channel;
    io.emit('channels', channels);

    // inclui usuário no channel
    channel.joined = true;
    socket.join(channel.id);
    socket.emit('joined channel', channel);

    console.log('criando channel ' + name);
  });

  socket.on('message', function({channelID, msg} = {}) {
    if (socket.rooms[channelID]) {
      io.to(channelID).emit('message', {channelID, msg});
      channels[channelID].msgs.push(msg);
      console.log('message: ' + msg.text + ' from: ' + msg.username + ' to channel: ' + channelID);
    }
  });
});

http.listen(3001, function() {
  console.log('listening on *:3001');
});