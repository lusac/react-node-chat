import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ChatHeader extends React.Component {
  render() {
    return (
      <div className="chat-header">
        <div className="chat-header__profile">
            Olá {this.props.username}!
        </div>

        <div className="chat-header__chat-name">
          {!this.props.chat.loading && this.props.chat.id && <span>chat {this.props.chat.id}</span>}
        </div>
      </div>
    )
  }
}

ChatHeader.propTypes = {
  username: PropTypes.string,
  chat: PropTypes.object
};

function mapStateToProps(state) {
  return ({
    chat: state.chat
  })
}

export default connect(mapStateToProps, {})(ChatHeader)


