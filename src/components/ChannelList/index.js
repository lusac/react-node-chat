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
      <div className="channel-list">
        <div className="channel-list__header">
          Olá <strong className="channel-list__header__name">{this.props.username}</strong>!
        </div>

        <div className="channel-list__section">
          <div className="channel-list__section__title">
            <span>Canais</span>
            <span
              className="plus"
              onClick={this.toggleModal.bind(this)}>+</span>
          </div>

          {Object.keys(this.props.channels).map(id => {
            return (
              <span
                key={id}
                className={"channel-list__item " + (this.props.channel.id === id ? 'selected' : '')}
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
  socket: PropTypes.object,
  channel: PropTypes.object,
  username: PropTypes.string,
  channels: PropTypes.object,
};