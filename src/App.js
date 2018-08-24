import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './styles/css/index.css'
import Chat from './components/Chat'
import ChatList from './components/ChatList'
import ChatHeader from './components/ChatHeader'
import { connectSocket } from './actions/socket'

class App extends Component {
  constructor() {
    super()
    this.state = {
      username: 'lusac'
    }
  }

  componentDidMount() {
    this.props.connectSocket()
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
          <ChatHeader username={this.state.username} />
          <ChatList />
          <Chat />
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

App.propTypes = {
  connectSocket: PropTypes.func,
};

function mapStateToProps(state) {
  return ({
    socket: state.socket
  })
}

export default connect(mapStateToProps, {
  connectSocket
})(App)