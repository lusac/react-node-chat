var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('message', function(msg) {
    console.log('message: ' + msg);
    io.emit('message', msg);
  });

});

http.listen(3001, function() {
  console.log('listening on *:3001');
});