import React from 'react'
import PropTypes from 'prop-types'

export default class NewChannelModal extends React.Component {
  constructor() {
    super()
    this.state = {
      channelName: ''
    }
  }

  createChat(channelName) {
    if (this.props.socket) {
      this.props.socket.emit('create channel', channelName)
    }
  }

  onChatNameChange(e) {
    this.setState({
      channelName: e.target.value
    })
  }

  onFormSubmit(e) {
    e.preventDefault()
    if (this.state.channelName) {
      this.createChat(this.state.channelName)
      this.props.toggleModal()
    }
  }

  render() {
    return (
      <div className="modal">
        <div className="modal__container">
          <div className="modal__dialog">
            <form onSubmit={this.onFormSubmit.bind(this)}>
              <span
                className="modal__close"
                onClick={this.props.toggleModal.bind(this)}>fechar</span>

              <h3>Crie um canal</h3>

              <label>nome</label>
              <input
                type="text"
                placeholder="ex: canal da galera"
                onChange={this.onChatNameChange.bind(this)}></input>

              <span className="modal__dialog__btns">
                <button
                  className="red"
                  type="button"
                  onClick={this.props.toggleModal.bind(this)}>cancelar</button>
                <button
                  disabled={!this.state.channelName}
                  className="blue"
                  type="submit">salvar</button>
              </span>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

NewChannelModal.propTypes = {
  socket: PropTypes.object,
  toggleModal: PropTypes.func
};