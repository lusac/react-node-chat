import React from 'react'
import PropTypes from 'prop-types'

export default class ChatList extends React.Component {
  selectChat(id) {
    this.props.socket.emit('join room', id)
  }

  render() {
    return (
      <div className="chat-list">
        {Object.keys(this.props.rooms).map(id => {
          return <span key={id} className="chat-list__item" onClick={this.selectChat.bind(this, id)}>{this.props.rooms[id].name}</span>
        })}
      </div>
    )
  }
}

ChatList.propTypes = {
  rooms: PropTypes.object,
  socket: PropTypes.object
};