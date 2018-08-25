import React from 'react'
import PropTypes from 'prop-types'

export default class ChatHeader extends React.Component {
  render() {
    return (
      <div className="chat-header">
        <div className="chat-header__profile">
          <span className="chat-header__profile__name">Olá {this.props.username}!</span>
        </div>

        {this.props.room && this.props.room.id &&
          <div className="chat-header__chat-name">{this.props.room.name}</div>
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
