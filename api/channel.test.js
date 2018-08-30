/* global describe it require expect beforeEach spyOn */
const uuid = require('uuid')
const sinon = require('sinon')
const channelManager = require('./channel')()

let ioFunc = () => {
  const emit = () => {return this}
  const to = () => {return this}
  return {emit, to}
}
let io = ioFunc()

let socketFunc = () => {
  const emit = () => {return this}
  const join = () => {return this}
  const rooms = {}
  return {emit, join, rooms}
}
let socket = socketFunc()

describe('createChannel method', () => {
  it('should insert channel in the channels object', () => {
    sinon.stub(uuid, 'v4').returns('1-2-3-4')
    channelManager.createChannel(socket, io, 'my channel')
    expect(channelManager.channels).toEqual({
      '1-2-3-4': {
        msgs: [],
        joined: true,
        id: '1-2-3-4',
        name: 'my channel'
      }
    })
  })

  it('should join room', () => {
    spyOn(socket, 'emit')
    spyOn(socket, 'join')
    spyOn(io, 'emit')
    channelManager.createChannel(socket, io, 'my channel')
    expect(socket.emit).toHaveBeenCalledWith('joined channel', {id: '1-2-3-4', joined: true, msgs: [], name: 'my channel'})
    expect(socket.join).toHaveBeenCalledWith('1-2-3-4')
    expect(io.emit).toHaveBeenCalledWith('channels', channelManager.channels)
  })
})

// describe('sendMessage method', () => {
//   it('should not send message if room doesnt exist', () => {
//     spyOn(io, 'to')
//     spyOn(io, 'emit')
//     socket.rooms[1] = true
//     channelManager.sendMessage(socket, io, {channelID: '1', msg: 'Hello!'})
//     expect(io.to).toBeCalledWith('1')
//     expect(io.emit).toBeCalledWith('message', {channelID: '1', msg: 'Hello!'})
//     // channels[channelID].msgs.push(msg)
//   })
// })

// describe('joinChannel method', () => {
// })

// describe('leaveChannel method', () => {
// })

describe('getChannel method', () => {
  it('should emit got channel', () => {
    spyOn(socket, 'emit')
    channelManager.channels['123'] = {
      id: 1-2-3-4,
      joined: false,
      msgs: [],
      name: "my channel"
    }
    channelManager.getChannel(socket, '123')
    expect(socket.emit).toHaveBeenCalledWith('got channel', {
      id: 1-2-3-4,
      joined: false,
      msgs: [],
      name: "my channel"
    })
  })

  it('should emit got channel with joined true', () => {
    spyOn(socket, 'emit')
    channelManager.channels['123'] = {
      id: 1-2-3-4,
      joined: false,
      msgs: [],
      name: "my channel"
    }
    socket.rooms['123'] = true
    channelManager.getChannel(socket, '123')
    expect(socket.emit).toHaveBeenCalledWith('got channel', {
      id: 1-2-3-4,
      joined: true,
      msgs: [],
      name: "my channel"
    })
  })
})