import React, { Component } from 'react'
import './styles/css/index.css'
import Channel from './components/Channel'
import ChannelList from './components/ChannelList'
import socketIOClient from 'socket.io-client'

class App extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      channels: {},
      channel: {},
      notifications: {}
    }
  }

  connectToSocket() {
    var socket = socketIOClient('http://localhost:3001')

    socket.on('connect', () => {
      // socket.emit('set username', this.state.username)
    });

    socket.on('channels', (channels) => {
      this.setState({
        channels: channels
      })
    })

    socket.on('joined channel', (channel) => {
      this.setState({
        channel: channel,
        notifications: {
          ...this.state.notifications,
          [channel.id]: 0
        }
      })
    })

    socket.on('message', (data) => {
      if (data.channelID === this.state.channel.id) {
        this.handleMessageFromCurrentChannel(data)
      } else {
        this.handleMessageFromOtherChannel(data)
      }
    })

    this.setState({
      socket: socket
    })
  }

  handleMessageFromCurrentChannel(data) {
    this.setState({
      channel: {
        ...this.state.channel,
        msgs: [
          ...this.state.channel.msgs,
          data.msg
        ]
      }
    })
  }

  handleMessageFromOtherChannel(data) {
    this.setState({
      notifications: {
        ...this.state.notifications,
        [data.channelID]: this.state.notifications[data.channelID] + 1 || 1
      }
    })
  }

  onUsernameSubmit(e) {
    e.preventDefault()
    this.setState({
      username: this.draftUsername
    }, () => {
      this.connectToSocket()
    })
  }

  onDraftUsernameChange(e) {
    this.draftUsername = e.target.value
  }

  renderChooseName() {
    if (!this.state.username) {
      return (
        <form onSubmit={this.onUsernameSubmit.bind(this)}>
          Escolha um nome de usuário:
          <input type="text" value={this.draftUsername} onChange={this.onDraftUsernameChange.bind(this)}/>
        </form>
      )
    }
  }

  renderChat() {
    if (this.state.username) {
      return (
        <div className="chat">
          <ChannelList
            username={this.state.username}
            channel={this.state.channel}
            channels={this.state.channels}
            socket={this.state.socket}
            notifications={this.state.notifications} />
          <Channel
            username={this.state.username}
            channel={this.state.channel}
            socket={this.state.socket}  />
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderChooseName()}
        {this.renderChat()}
      </div>
    )
  }
}

export default App