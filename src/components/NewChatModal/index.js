import React from 'react'
import PropTypes from 'prop-types'

export default class NewChatModal extends React.Component {
  constructor() {
    super()
    this.state = {
      chatName: ''
    }
  }

  createChat(chatName) {
    if (this.props.socket) {
      this.props.socket.emit('create room', chatName)
    }
  }

  onChatNameChange(e) {
    this.setState({
      chatName: e.target.value
    })
  }

  onFormSubmit(e) {
    e.preventDefault()
    if (this.state.chatName) {
      this.createChat(this.state.chatName)
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
                  disabled={!this.state.chatName}
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

NewChatModal.propTypes = {
  socket: PropTypes.object,
  toggleModal: PropTypes.func
};