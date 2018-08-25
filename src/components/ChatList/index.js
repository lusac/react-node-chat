import React from 'react'
import PropTypes from 'prop-types'
import NewChatModal from '../NewChatModal'

export default class ChatList extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: false
    }
  }

  selectChat(id) {
    this.props.socket.emit('join room', id)
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render() {
    return (
      <div className="chat-list">
        <div className="chat-list__header">
          Ola lusac
        </div>

        <div className="chat-list__section">
          <div className="chat-list__section__title"
            onClick={this.toggleModal.bind(this)}>Chats +</div>

          {Object.keys(this.props.rooms).map(id => {
            return (
              <span
                key={id}
                className={"chat-list__item " + (this.props.room.id === id ? 'selected' : '')}
                onClick={this.selectChat.bind(this, id)}>
                  # {this.props.rooms[id].name}</span>
            )
          })}
        </div>

        {this.state.showModal &&
          <NewChatModal
            toggleModal={this.toggleModal.bind(this)}
            socket={this.props.socket} />
        }
      </div>
    )
  }
}

ChatList.propTypes = {
  room: PropTypes.object,
  rooms: PropTypes.object,
  socket: PropTypes.object
};