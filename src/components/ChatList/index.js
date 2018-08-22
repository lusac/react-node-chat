import React from 'react';
import PropTypes from 'prop-types';

class ChatList extends React.Component {
  render() {
    return (
      <div className="chat-list">
        {this.props.rooms.map(function(room, i) {
          return (<span key={i} className="chat-list__item">{room.name}</span>)
        })}
      </div>
    )
  }
}

ChatList.propTypes = {
  rooms: PropTypes.array
};

export default ChatList;
