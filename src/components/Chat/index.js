import React from 'react'
import PropTypes from 'prop-types'

export default class Chat extends React.Component {
  constructor(props) {
    super()
    this.state = {
      msg: '',
      room: props.room || {},
      msgs: props.room.msgs || []
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.room.id !== prevProps.room.id) {
      this.updateRoomConnection()
    }
  }

  updateRoomConnection() {
    this.setState({
      msgs: this.props.room.msgs
    }, () => {
      this.props.socket.off('message').on('message', (msg) => {
        this.setState({
          msgs: [...this.state.msgs, msg]
        })
      })
    })
  }

  onMsgChange(e) {
    this.setState({
      msg: e.target.value
    })
  }

  onMsgSubmit(e) {
    e.preventDefault()
    this.props.socket.emit('message', {
      roomID: this.props.room.id,
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
          {!this.props.room.id && <span>Nenhum chat selecionado</span>}
          {this.props.room.id && this.state.msgs.map((msg, i) => <div key={i}>{msg}</div> )}
        </div>

        {this.props.room.id &&
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
  room: PropTypes.object,
  socket: PropTypes.object
}