import React from 'react'
import PropTypes from 'prop-types'

export default class ChatHeader extends React.Component {
  createRoom() {
    if (this.props.socket) {
      this.props.socket.emit('create room', 'xundeira')
    }
  }

  render() {
    return (
      <div className="chat-header">
        <div className="chat-header__profile">
          Olá {this.props.username}!
          <span onClick={this.createRoom.bind(this)}> Nova sala</span>
        </div>

        {this.props.room &&
          <div className="chat-header__chat-name">chat {this.props.room.name}</div>
        }
      </div>
    )
  }
}

ChatHeader.propTypes = {
  room: PropTypes.object,
  socket: PropTypes.object,
  username: PropTypes.string
};
