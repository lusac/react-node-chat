import React, { Component } from 'react'
import './styles/css/index.css'
import Chat from './components/Chat'
import ChatList from './components/ChatList'
import ChatHeader from './components/ChatHeader'

class App extends Component {
  constructor() {
    super()
    this.state = {
      msg: '',
      username: 'lusac',
      rooms: [
        {name: 'sala 1'},
        {name: 'sala 2'},
        {name: 'sala 3'},
        {name: 'sala 4'},
        {name: 'sala 5'}
      ]
    }
  }

  componentDidMount() {
    // this.wsConnect()
  }

  wsConnect() {
    this.state.connection = new WebSocket('ws://127.0.0.1:3001')

    this.state.connection.onopen = function () {
      console.log('WS OPENED!')
    }

    this.state.connection.onerror = function (error) {
      alert('WS ERROR!')
    }

    this.state.connection.onmessage = function (message) {
      // try to decode json (I assume that each message
      // from server is json)
      try {
        var json = JSON.parse(message.data)
        alert(json)
      } catch (e) {
        alert('SERVER NAO RETORNOU JSON')
      }

      if (json.type === 'color') {
      } else if (json.type === 'history') { // entire message history
        for (var i=0; i < json.data.length; i++) {
        console.log(json.data[i].author, json.data[i].text,
            json.data[i].color, new Date(json.data[i].time))
        }
      } else if (json.type === 'message') { // it's a single message
        console.log(json.data.author, json.data.text,
                   json.data.color, new Date(json.data.time))
      } else {
        console.log('Hmm..., I\'ve never seen JSON like this:', json)
      }
    }
  }

  onMsgChange(e) {
    this.setState({
      msg: e.target.value
    })
  }

  onMsgSubmit(e) {
    e.preventDefault()
    this.state.connection.send(this.state.msg)
    this.setState({
      msg: ''
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

  renderChatRooms() {
    if (this.state.username) {
      return (
        <div>
          <div className="chat">
            <ChatHeader username={this.state.username} />
            <ChatList rooms={this.state.rooms}/>
            <Chat />
          </div>

          {/* <form onSubmit={this.onMsgSubmit.bind(this)}>
            <label>
              Msg:
              <input type="text" value={this.state.msg} onChange={this.onMsgChange.bind(this)} />
            </label>
            <input type="submit" value="Submit" />
          </form> */}
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderChooseName()}
        {this.renderChatRooms()}
      </div>
    )
  }
}

export default App
