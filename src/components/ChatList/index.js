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
        <div onClick={this.toggleModal.bind(this)}>Chats +</div>

        {Object.keys(this.props.rooms).map(id => {
          return <span key={id} className="chat-list__item" onClick={this.selectChat.bind(this, id)}>{this.props.rooms[id].name}</span>
        })}

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
  rooms: PropTypes.object,
  socket: PropTypes.object
};