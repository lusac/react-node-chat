import React, { Component } from 'react'
import './styles/css/index.css'
import Chat from './components/Chat'
import ChatList from './components/ChatList'
import ChatHeader from './components/ChatHeader'
import socketIOClient from 'socket.io-client'

class App extends Component {
  constructor() {
    super()
    this.state = {
      username: 'lusac',
      rooms: {},
      room: {}
    }
  }

  componentDidMount() {
    var socket = socketIOClient('http://localhost:3001')

    socket.on('connect', () => {
      // connect
    });

    socket.on('rooms', (rooms) => {
      this.setState({
        rooms: rooms
      })
    })

    socket.on('joined room', (room) => {
      this.setState({
        room: room
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
          <ChatHeader username={this.state.username} room={this.state.room} socket={this.state.socket} />
          <ChatList rooms={this.state.rooms} socket={this.state.socket} />
          <Chat room={this.state.room} socket={this.state.socket} />
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