import React, { Component } from 'react'
import './styles/css/index.css'
import Channel from './components/Channel'
import ChannelList from './components/ChannelList'
import socketIOClient from 'socket.io-client'

class App extends Component {
  constructor() {
    super()
    this.state = {
      username: 'lusac',
      channels: {},
      channel: {}
    }
  }

  componentDidMount() {
    var socket = socketIOClient('http://localhost:3001')

    socket.on('connect', () => {
      // connect
    });

    socket.on('channels', (channels) => {
      this.setState({
        channels: channels
      })
    })

    socket.on('joined channel', (channel) => {
      this.setState({
        channel: channel
      })
    })

    this.setState({
      socket: socket
    })
  }

  onUsernameSubmit(e) {
    e.preventDefault()
    this.setState({
      username: this.draftUsername
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
            socket={this.state.socket} />
          <Channel
            username={this.state.username}
            channel={this.state.channel}
            socket={this.state.socket} />
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