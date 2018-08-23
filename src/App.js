import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import './styles/css/index.css'
import Chat from './components/Chat'
import ChatList from './components/ChatList'
import ChatHeader from './components/ChatHeader'

const store = configureStore()

class App extends Component {
  constructor() {
    super()
    this.state = {
      username: 'lusac'
    }
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
        <div className="chat">
          <ChatHeader username={this.state.username} />
          <ChatList />
          <Chat />
        </div>
      )
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          {this.renderChooseName()}
          {this.renderChatRooms()}
        </div>
      </Provider>
    )
  }
}

export default App