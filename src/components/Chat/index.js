/* global alert */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      msg: '',
      msgs: [],
      connection: null
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.chat.id !== prevProps.chat.id) {
      this.handleWsConnection()
    }
  }

  handleWsConnection() {
    if (this.props.socket.socket) {
      this.props.socket.socket.on('message', (msg) => {
        this.setState({
          msgs: [...this.state.msgs, msg]
        })
      })
    }
  }

  onMsgChange(e) {
    this.setState({
      msg: e.target.value
    })
  }

  onMsgSubmit(e) {
    e.preventDefault()
    this.props.socket.socket.emit('message', {
      room: this.props.chat.id,
      msg: this.state.msg
    })
    this.setState({
      msg: ''
    })
  }

  render() {
    return (
      <div className="chat-room">
        <div className="chat-room__messages">
          {!this.props.chat.loading && !this.props.chat.id && this.props.chat.messages.length === 0 && <span>Nenhum chat selecionado</span>}
          {this.props.chat.loading && <span>carregando chat</span>}
          {!this.props.chat.loading && this.props.chat.id &&
            this.state.msgs.map((msg, i) => <div key={i}>{msg}</div> )
          }
        </div>

        {!this.props.chat.loading && this.props.chat.id &&
          <div className="chat-room__input__wrapper">
            <form onSubmit={this.onMsgSubmit.bind(this)}>
              <input
                placeholder="escreva uma mensagem"
                className="chat-room__input"
                value={this.state.msg}
                onChange={this.onMsgChange.bind(this)} />
              {/* <input type="submit" value="Submit" /> */}
            </form>
          </div>
        }
      </div>
    )
  }
}

Chat.propTypes = {
  chat: PropTypes.object,
  socket: PropTypes.object
};

function mapStateToProps(state) {
  return ({
    chat: state.chat,
    socket: state.socket
  })
}

export default connect(mapStateToProps)(Chat)