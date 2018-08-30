/* global describe it require expect beforeEach spyOn */
const uuid = require('uuid')
const sinon = require('sinon')
const channelManager = require('./channel')()

function ioFunc() {}
ioFunc.prototype.emit = function() {return this}
ioFunc.prototype.to = function() {return this}

function socketFunc() { this.rooms = {} }
socketFunc.prototype.emit = function()  {return this}
socketFunc.prototype.join = function()  {return this}

describe('Channel tests', () => {
  var io, socket;

  beforeEach(() => {
    io = new ioFunc()
    socket = new socketFunc()
  })

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

  describe('sendMessage method', () => {
    it('should not send message if room doesnt exist', () => {
      spyOn(io, 'to').and.callThrough()
      spyOn(io, 'emit').and.callThrough()
      channelManager.sendMessage(socket, io, {channelID: '1', msg: 'Hello!'})
      expect(io.to).not.toBeCalled()
      expect(io.emit).not.toBeCalled()
      // channels[channelID].msgs.push(msg)
    })

    it('should send message if room doesnt exist', () => {
      spyOn(io, 'to').and.callThrough()
      spyOn(io, 'emit').and.callThrough()
      channelManager.channels['1'] = {msgs:[]}
      socket.rooms[1] = true
      channelManager.sendMessage(socket, io, {channelID: '1', msg: 'Hello!'})
      expect(io.to).toBeCalledWith('1')
      expect(io.emit).toBeCalledWith('message', {channelID: '1', msg: 'Hello!'})
    })

    it('should append msgs after send in channel msg array', () => {
      spyOn(io, 'to').and.callThrough()
      spyOn(io, 'emit').and.callThrough()
      channelManager.channels['1'] = {msgs:[]}
      socket.rooms[1] = true
      channelManager.sendMessage(socket, io, {channelID: '1', msg: 'Hello!'})
      expect(channelManager.channels['1'].msgs.length).toBe(1)
      expect(channelManager.channels['1'].msgs[0]).toBe('Hello!')
    })
  })

  describe('joinChannel method', () => {
    it('should join socket', () => {
      spyOn(socket, 'join').and.callThrough()
      channelManager.joinChannel(socket, io, {channelID: '1', msg: 'Hello!'})
      expect(socket.join).toBeCalledWith('1')
    })

    it('should emit join channel', () => {
      spyOn(socket, 'emit').and.callThrough()
      channelManager.joinChannel(socket, io, {channelID: '1', msg: 'Hello!'})
      expect(socket.emit).toBeCalledWith('joined channel', {'joined': true, 'msgs': ['Hello!', 'Hello!', 'Hello!']})
    })

    it('should emit message to channel', () => {
      spyOn(io, 'to').and.callThrough()
      spyOn(io, 'emit').and.callThrough()
      channelManager.joinChannel(socket, io, {channelID: '1', msg: 'Hello!'})
      expect(io.to).toBeCalledWith('1')
      expect(io.emit).toBeCalledWith('message', {'channelID': '1', 'msg': 'Hello!'})
      // and append to channel
    })
  })

  describe('leaveChannel method', () => {
  })

  describe('getChannel method', () => {
    it('should emit got channel', () => {
      spyOn(socket, 'emit')
      channelManager.channels['123'] = {
        id: 1-2-3-4,
        joined: false,
        msgs: [],
        name: 'my channel'
      }
      channelManager.getChannel(socket, '123')
      expect(socket.emit).toHaveBeenCalledWith('got channel', {
        id: 1-2-3-4,
        joined: false,
        msgs: [],
        name: 'my channel'
      })
    })

    it('should emit got channel with joined true', () => {
      spyOn(socket, 'emit')
      channelManager.channels['123'] = {
        id: 1-2-3-4,
        joined: false,
        msgs: [],
        name: 'my channel'
      }
      socket.rooms['123'] = true
      channelManager.getChannel(socket, '123')
      expect(socket.emit).toHaveBeenCalledWith('got channel', {
        id: 1-2-3-4,
        joined: true,
        msgs: [],
        name: 'my channel'
      })
    })
  })
})