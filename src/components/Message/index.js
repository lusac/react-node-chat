import React from 'react'
import PropTypes from 'prop-types'

export default class Message extends React.Component {
  formatDate(date) {
    let d = new Date(date)
    return `${d.toLocaleDateString()}, ${d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
  }

  render() {
    return (
      <div className="message">
        <div className="message__left">
          <span className="message__photo">{this.props.message.username[0].toLocaleUpperCase()}</span>
        </div>

        <div className="message__right">
          <strong className="message__info">
            <span>{this.props.message.username}</span>
            <span className="message__date">{this.formatDate(this.props.message.date)}</span>
          </strong>

          <span className="message__text">
            {this.props.message.text}
          </span>
        </div>
      </div>
    )
  }
}

Message.propTypes = {
  message: PropTypes.object
}