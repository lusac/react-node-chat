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

  selectChannel(id) {
    this.props.socket.emit('get channel', id)
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  getNotJoinedChannelsIDs() {
    return Object.keys(this.props.channels).filter(id =>
      this.props.user.channels.indexOf(id) === -1
    )
  }

  getJoinedChannelsIDs() {
    return this.props.user.channels.filter(id =>
      this.props.channels[id].id
    )
  }

  render() {
    return (
      <div className="channel-list">
        <div className="channel-list__header">
          Olá <strong className="channel-list__header__name">{this.props.user.name}</strong>!
        </div>

        <div className="channel-list__section">
          {!!this.props.user.channels.length &&
            <div className="channel-list__section__title">
              <span>Participando</span>
            </div>
          }

          {!!this.props.user.channels.length &&
            <ul>
              {this.getJoinedChannelsIDs().map(id => {
                return (
                  <li
                    key={id}
                    className={"channel-list__item " + (this.props.channel.id === id ? 'selected' : '')}
                    onClick={this.selectChannel.bind(this, id)}>
                    <span className="channel-list__item__name"># {this.props.channels[id].name}</span>
                    {!!this.props.notifications[id] &&
                      <span className="badge">{this.props.notifications[id]}</span>}
                  </li>
                )
              })}
            </ul>
          }

          <div className="channel-list__section__title">
            <span>Canais</span>
            <span
              className="plus"
              onClick={this.toggleModal.bind(this)}>+</span>
          </div>

          <ul>
            {this.getNotJoinedChannelsIDs().map(id => {
              return (
                <li
                  key={id}
                  className={"channel-list__item " + (this.props.channel.id === id ? 'selected' : '')}
                  onClick={this.selectChannel.bind(this, id)}>
                  <span className="channel-list__item__name"># {this.props.channels[id].name}</span>
                  {!!this.props.notifications[id] &&
                    <span className="badge">{this.props.notifications[id]}</span>}
                </li>
              )
            })}
          </ul>
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
  user: PropTypes.object,
  channels: PropTypes.object,
  notifications: PropTypes.object
};