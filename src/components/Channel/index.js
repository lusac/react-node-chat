import React from 'react'
import PropTypes from 'prop-types'

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
      this.props.socket.off('message').on('message', (msg) => {
        this.setState({
          msgs: [...this.state.msgs, msg]
        })
      })
    })
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
      msg: this.state.msg
    })
    this.setState({
      msg: ''
    })
  }

  render() {
    return (
      <div className="channel">
        <div className="channel__header">
          header
        </div>

        <div className="channel__section">
          <div className="channel__chat">
            {!this.props.channel.id && <span>Nenhum canal selecionado</span>}
            {this.props.channel.id && this.state.msgs.map((msg, i) => <div key={i}>{msg}</div> )}
          </div>

          {this.props.channel.id &&
            <div className="channel__chat-input__wrapper">
              <form onSubmit={this.onMsgSubmit.bind(this)}>
                <input
                  placeholder="escreva uma mensagem"
                  className="channel__chat-input"
                  value={this.state.msg}
                  onChange={this.onMsgChange.bind(this)} />
                {/* <input type="submit" value="Submit" /> */}
              </form>
            </div>
          }
        </div>
      </div>
    )
  }
}

Channel.propTypes = {
  channel: PropTypes.object,
  socket: PropTypes.object
}