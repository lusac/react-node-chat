import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class ChatHeader extends React.Component {
  render() {
    return (
      <div className="chat-header">
        <div className="chat-header__profile">
            Olá {this.props.username}!
        </div>

        {this.props.chat.id &&
          <div className="chat-header__chat-name">chat {this.props.chat.id}</div>
        }
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


