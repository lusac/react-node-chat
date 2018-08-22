import React from 'react';
import PropTypes from 'prop-types';

class ChatHeader extends React.Component {
  render() {
    return (
      <div className="chat-header">
        <div className="chat-header__profile">
            Olá {this.props.username}!
        </div>

        <div className="chat-header__chat-name">
          chat 1
        </div>
      </div>
    )
  }
}

ChatHeader.propTypes = {
  username: PropTypes.string,
  chatName: PropTypes.string
};

export default ChatHeader;
