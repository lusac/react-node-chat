/* global require process __dirname */
const path = require('path')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const channelManager = require('./channel')()

const PORT = process.env.PORT || 3001

if (process.env.IS_PROD) {
  app
    .use(express.static(path.join(__dirname, '../build')))
    .get('/', (_, res) =>
      res.sendFile(path.join(__dirname, '..', 'build/index.html')))
}

io.on('connection', socket => {
  console.log('user connected')

  io.emit('channels', channelManager.channels)

  socket.on('get channel', channelManager.getChannel.bind(this, socket))

  socket.on('leave channel', channelManager.leaveChannel.bind(this, socket, io))

  socket.on('join channel', channelManager.joinChannel.bind(this, socket, io))

  socket.on('create channel', channelManager.createChannel.bind(this, socket, io))

  socket.on('message', channelManager.sendMessage.bind(this, socket, io))

  // socket.on('disconnect', () => {
  //   console.log('user disconnected')
  // })
})

server.listen(PORT, () => {
  console.log('* Client started at port *:3000')
  console.log(`* Server started at port *:${PORT}`)
})