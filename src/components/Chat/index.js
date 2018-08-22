import React from 'react';

class Chat extends React.Component {
  render() {
    return (
      <div className="chat-room">
        <div className="chat-room__messages">
          oie
        </div>

        <div className="chat-room__input__wrapper">
          <input placeholder="escreva uma mensagem" className="chat-room__input"/>
        </div>
      </div>
    )
  }
}

export default Chat;
