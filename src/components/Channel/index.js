import React from 'react'
import PropTypes from 'prop-types'
import Message from '../Message'

export default class Channel extends React.Component {
  constructor(props) {
    super()
    this.state = {
      msg: '',
      channel: props.channel || {}
    }
  }

  onMsgChange(e) {
    this.setState({
      msg: e.target.value
    })
  }

  onMsgSubmit(e) {
    e.preventDefault()
    this.props.socket.emit('message', {
      channelID: this.props.channel.id,
      msg: {
        date: new Date(),
        text: this.state.msg,
        color: this.props.user.color,
        username: this.props.user.name
      }
    })
    this.setState({
      msg: ''
    })
  }

  joinChannel() {
    this.props.socket.emit('join channel', this.props.channel.id)
  }

  renderEmptyState() {
    if (!this.props.channel.id) {
      return (
        <div className="channel__empty-state">
          <strong>Escolha ou crie um canal para conversar com outras pessoas!</strong>
        </div>
      )
    }
  }

  renderChannelContent() {
    if (this.props.channel.id) {
      return(
        <div className="channel__content">
          <div className="channel__header">
            {this.props.channel.name}
          </div>

          <div className="channel__section">
            {this.props.channel.msgs.map((msg, i) =>
              <Message key={i} message={this.props.channel.msgs[this.props.channel.msgs.length-1-i]} />
            )}
            {!this.props.channel.msgs.length &&
              <span>nenhuma mensagem</span>}
          </div>

          <div className={'channel__footer ' + (!this.props.channel.joined ? 'channel__footer--join': '')}>
            {this.props.channel.joined &&
              <form onSubmit={this.onMsgSubmit.bind(this)}>
                <input
                  placeholder="escreva uma mensagem"
                  className="channel__chat-input"
                  value={this.state.msg}
                  onChange={this.onMsgChange.bind(this)} />
              </form>
            }

            {!this.props.channel.joined &&
              <button
                className="blue"
                onClick={this.joinChannel.bind(this)}>
                Entrar no canal</button>
            }
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="channel">
        {this.renderEmptyState()}
        {this.renderChannelContent()}
      </div>
    )
  }
}

Channel.propTypes = {
  user: PropTypes.object,
  socket: PropTypes.object,
  channel: PropTypes.object
}