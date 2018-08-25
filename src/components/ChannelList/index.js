import React from 'react'
import PropTypes from 'prop-types'
import NewChannelModal from '../NewChannelModal'

export default class ChannelList extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: false
    }
  }

  selectChat(id) {
    this.props.socket.emit('join channel', id)
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render() {
    return (
      <div className="chat-list">
        <div className="chat-list__header">
          Ola lusac
        </div>

        <div className="chat-list__section">
          <div className="chat-list__section__title"
            onClick={this.toggleModal.bind(this)}>Canais +</div>

          {Object.keys(this.props.channels).map(id => {
            return (
              <span
                key={id}
                className={"chat-list__item " + (this.props.channel.id === id ? 'selected' : '')}
                onClick={this.selectChat.bind(this, id)}>
                  # {this.props.channels[id].name}</span>
            )
          })}
        </div>

        {this.state.showModal &&
          <NewChannelModal
            toggleModal={this.toggleModal.bind(this)}
            socket={this.props.socket} />
        }
      </div>
    )
  }
}

ChannelList.propTypes = {
  channel: PropTypes.object,
  channels: PropTypes.object,
  socket: PropTypes.object
};