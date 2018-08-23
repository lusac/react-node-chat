import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getChats } from '../../actions/chats'

class ChatList extends React.Component {
  componentDidMount() {
    this.props.getChats()
  }

  render() {
    return (
      <div className="chat-list">
        {this.props.chats.loading && <span>loading...</span>}
        {!this.props.chats.loading && this.props.chats.chats.map(function(room) {
          return (<span key={room.id} className="chat-list__item">{room.name}</span>)
        })}
      </div>
    )
  }
}

ChatList.propTypes = {
  rooms: PropTypes.array,
  chats: PropTypes.func,
  getChats: PropTypes.func
};


function mapStateToProps(state) {
  return ({ chats: state.chats })
}

export default connect(mapStateToProps, {
  getChats
})(ChatList)
