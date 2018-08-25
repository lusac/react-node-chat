/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import Message from '../Message'

export default class Channel extends React.Component {
  constructor(props) {
    super()
    this.state = {
      msg: '',
      channel: props.channel || {},
      msgs: props.channel.msgs || []
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.channel.id !== prevProps.channel.id) {
      this.updateChannelConnection()
    }
  }

  updateChannelConnection() {
    this.setState({
      msgs: this.props.channel.msgs
    }, () => {
      this.scrollBottom()
      this.props.socket.off('message').on('message', (msg) => {
        this.setState({
          msgs: [...this.state.msgs, msg]
        }, () => {
          this.scrollBottom()
        })
      })
    })
  }

  scrollBottom() {
    let c = document.getElementsByClassName('channel__section')[0]
    c.scrollTop = c.scrollHeight
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
        username: this.props.username,
        text: this.state.msg
      }
    })
    this.setState({
      msg: ''
    })
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
            {this.state.msgs.map((msg, i) =>
              <Message key={i} message={this.state.msgs[this.state.msgs.length-1-i]} />
            )}
            {!this.state.msgs.length &&
              <span>nenhuma mensagem</span>}
          </div>

          <div className="channel__footer">
            <form onSubmit={this.onMsgSubmit.bind(this)}>
              <input
                placeholder="escreva uma mensagem"
                className="channel__chat-input"
                value={this.state.msg}
                onChange={this.onMsgChange.bind(this)} />
              {/* <input type="submit" value="Submit" /> */}
            </form>
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
  socket: PropTypes.object,
  channel: PropTypes.object,
  username: PropTypes.string
}