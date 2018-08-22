"use strict";

var webSocketsServerPort = 3001;
var webSocketServer = require('websocket').server;
var http = require('http');

var history = [ ];
var clients = [ ];

function htmlEntities(str) {
  return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

var server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server,
  // not HTTP server
});

server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port "
      + webSocketsServerPort);
});

var wsServer = new webSocketServer({
  httpServer: server
});

wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

  var connection = request.accept(null, request.origin);
  var index = clients.push(connection) - 1;
  var userName = false;

  console.log((new Date()) + ' Connection accepted.');
  // send back chat history
  if (history.length > 0) {
    connection.sendUTF(
        JSON.stringify({ type: 'history', data: history} ));
  }
  // user sent some message
  connection.on('message', function(message) {
    // accept only text
    if (message.type === 'utf8') {

    // first message sent by user is their name
     if (userName === false) {
        userName = htmlEntities(message.utf8Data);
        console.log((new Date()) + ' User is known as: ' + userName);
      } else { // log and broadcast the message
        console.log((new Date()) + ' Received Message from '
                    + userName + ': ' + message.utf8Data);

        // we want to keep history of all sent messages
        var obj = {
          time: (new Date()).getTime(),
          text: htmlEntities(message.utf8Data),
          author: userName,
        };
        history.push(obj);
        history = history.slice(-100);
        // broadcast message to all connected clients
        var json = JSON.stringify({ type:'message', data: obj });
        for (var i=0; i < clients.length; i++) {
          clients[i].sendUTF(json);
        }
      }
    }
  });
  // user disconnected
  connection.on('close', function(connection) {
    if (userName !== false) {
      console.log((new Date()) + " Peer "
          + connection.remoteAddress + " disconnected.");
      // remove user from the list of connected clients
      clients.splice(index, 1);
    }
  });
});