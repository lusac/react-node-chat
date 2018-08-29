/* global process */
import React, { Component } from 'react'
import './styles/css/index.css'
import Channel from './components/Channel'
import ChannelList from './components/ChannelList'
import { Header } from './components/Header'
import socketIOClient from 'socket.io-client'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        channels: []
      },
      channels: {},
      channel: {},
      notifications: {}
    }
  }

  connectToSocket() {
    const host = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'
    let socket = socketIOClient(host)

    // socket.on('connect', () => {});

    socket.on('channels', (channels) => {
      this.setState({
        channels: channels
      })
    })

    socket.on('got channel', (channel) => {
      this.setState({
        channel: channel
      })
    })

    socket.on('leaved channel', (channel) => {
      this.setState({
        channel: channel,
        user: {
          ...this.state.user,
          channels: this.state.user.channels.filter((id) => {
            return id !== channel.id
          })
        },
        notifications: {
          ...this.state.notifications,
          [channel.id]: 0
        }
      })
    })

    socket.on('joined channel', (channel) => {
      this.setState({
        channel: channel,
        user: {
          ...this.state.user,
          channels: [
            ...this.state.user.channels,
            channel.id
          ]
        },
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
      user: {
        ...this.state.user,
        name: this.draftUsername,
        color: Math.floor((Math.random() * 6) + 1)
      }
    }, () => {
      this.connectToSocket()
    })
  }

  onDraftUsernameChange(e) {
    this.draftUsername = e.target.value
  }

  renderChooseName() {
    if (!this.state.user.name) {
      return (
        <div className="form-choose-name">
          <div className="form-choose-name__content">
            <form onSubmit={this.onUsernameSubmit.bind(this)}>
              <label>Escolha um apelido</label>
              <input
                type="text"
                value={this.draftUsername}
                placeholder="ex: lucas.cruz"
                onChange={this.onDraftUsernameChange.bind(this)} />
              <button className="blue">entrar</button>
            </form>
          </div>
        </div>
      )
    }
  }

  renderChat() {
    if (this.state.user.name) {
      return (
        <div>
          <Header />
          <input type="checkbox" id="toggleChannelList"></input>
          <div className="chat">
            <ChannelList
              user={this.state.user}
              channel={this.state.channel}
              channels={this.state.channels}
              socket={this.state.socket}
              notifications={this.state.notifications} />
            <Channel
              user={this.state.user}
              channel={this.state.channel}
              socket={this.state.socket}  />
          </div>
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