import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Chat extends React.Component {
  render() {
    return (
      <div className="chat-room">
        <div className="chat-room__messages">
          {!this.props.chat.loading && !this.props.chat.id && this.props.chat.messages.length === 0 && <span>Nenhum chat selecionado</span>}
          {this.props.chat.loading && <span>carregando chat</span>}
          {!this.props.chat.loading && this.props.chat.id && <span>mensagens chat{this.props.chat.id}</span>}
        </div>

        <div className="chat-room__input__wrapper">
          <input placeholder="escreva uma mensagem" className="chat-room__input"/>
        </div>
      </div>
    )
  }
}

Chat.propTypes = {
  chat: PropTypes.object
};

function mapStateToProps(state) {
  return ({
    chat: state.chat
  })
}

export default connect(mapStateToProps)(Chat)

