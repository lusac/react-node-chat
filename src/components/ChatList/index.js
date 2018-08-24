import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getChats } from '../../actions/chats'
import { getChat } from '../../actions/chat'

export class ChatList extends React.Component {
  componentDidMount() {
    this.props.getChats()
  }

  selectChat(id) {
    if (this.props.socket.socket) {
      this.props.getChat(id)
      this.props.socket.socket.emit('room', id)
    }
  }

  render() {
    return (
      <div className="chat-list">
        {this.props.chats.loading && <span>loading...</span>}
        {!this.props.chats.loading && this.props.chats.chats.map((room) => {
          return <span key={room.id} className="chat-list__item" onClick={this.selectChat.bind(this, room.id)}>{room.name}</span>
        })}
      </div>
    )
  }
}

ChatList.propTypes = {
  chats: PropTypes.object,
  getChats: PropTypes.func,
  getChat: PropTypes.func,
  socket: PropTypes.object
};

function mapStateToProps(state) {
  return ({
    chat: state.chat,
    chats: state.chats,
    socket: state.socket
  })
}

export default connect(mapStateToProps, {
  getChats,
  getChat
})(ChatList)
