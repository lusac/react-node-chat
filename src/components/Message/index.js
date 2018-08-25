import React from 'react'
import PropTypes from 'prop-types'

export default class Message extends React.Component {
  render() {
    return (
      <div className="message">
        <strong className="message__username">
          {this.props.message.username}
        </strong>

        <span className="message__text">
          {this.props.message.text}
        </span>
      </div>
    )
  }
}

Message.propTypes = {
  message: PropTypes.object
}