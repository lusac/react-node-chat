/* global require module */
var uuidv4 = require('uuid/v4')

module.exports = () => {
  const channels = {}

  const createChannel = (socket, io, name) => {
    let channel = {
      id: uuidv4(),
      name: name,
      msgs: []
    }
    channels[channel.id] = channel
    io.emit('channels', channels)
    socket.join(channel.id)
    socket.emit('joined channel', Object.assign(channel, {joined: true}))
    console.log('criando channel ' + name)
  }

  const sendMessage = (socket, io, {channelID, msg} = {}) => {
    if (socket.rooms[channelID]) {
      io.to(channelID).emit('message', {channelID, msg})
      channels[channelID].msgs.push(msg)
      console.log('message: ' + msg.text + ' from: ' + msg.username + ' to channel: ' + channelID)
    }
  }

  const joinChannel = (socket, io, {channelID, msg} = {}) => {
    let channel = channels[channelID]
    channel.joined = true
    socket.join(channelID)
    socket.emit('joined channel', channel)
    io.to(channelID).emit('message', {
      channelID, msg: msg
    })
    channels[channelID].msgs.push(msg)
    console.log('user connected to channel: ' + channelID)
  }

  const leaveChannel = (socket, io, {channelID, msg} = {}) => {
    let channel = channels[channelID]
    channel.joined = false
    io.to(channelID).emit('message', {
      channelID, msg: msg
    })
    socket.leave(channelID)
    channels[channelID].msgs.push(msg)
    channel.msgs = channels[channelID].msgs
    socket.emit('leaved channel', channel)
    console.log('user leaved channel: ' + channelID)
  }

  const getChannel = (socket, channelID) => {
    let channel = channels[channelID]
    channel.joined = false
    if (socket.rooms[channelID]) {
      channel.joined = true
    }
    socket.emit('got channel', channel)
    console.log('got spying channel: ' + channelID)
  }

  return {
    channels,
    createChannel,
    sendMessage,
    joinChannel,
    leaveChannel,
    getChannel
  }
}