/* global alert WebSocket */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import socketIOClient from 'socket.io-client'

export class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      msg: '',
      msgs: [],
      connection: null
    }
  }

  componentDidMount() {
    this.wsConnect()
  }

  wsConnect() {
    var socket = socketIOClient('http://localhost:3001')

    this.setState({
      socket: socket
    })

    socket.on('message', (msg) => {
      this.setState({
        msgs: [...this.state.msgs, msg]
      })
    })

    // let connection = new WebSocket('ws://127.0.0.1:3001')

    // connection.onopen = function () {
    //   console.log('WS OPENED!')
    // }

    // connection.onerror = function (error) {
    //   alert(`WS ERROR: ${error}`)
    // }

    // connection.onmessage = function (message) {
    //   // try to decode json (I assume that each message
    //   // from server is json)
    //   try {
    //     var json = JSON.parse(message.data)
    //     alert(json)
    //   } catch (e) {
    //     alert('SERVER NAO RETORNOU JSON')
    //   }
    //   debugger;
    //   if (json.type === 'color') {
    //     // pass...
    //   } else if (json.type === 'history') { // entire message history
    //     for (var i=0; i < json.data.length; i++) {
    //       console.log(json.data[i].author, json.data[i].text, json.data[i].color, new Date(json.data[i].time))
    //     }
    //   } else if (json.type === 'message') { // it's a single message
    //     console.log(json.data.author, json.data.text, json.data.color, new Date(json.data.time))
    //   } else {
    //     console.log('Hmm..., I\'ve never seen JSON like this:', json)
    //   }
    // }
  }

  onMsgChange(e) {
    this.setState({
      msg: e.target.value
    })
  }

  onMsgSubmit(e) {
    e.preventDefault()
    this.state.socket.emit('message', this.state.msg)
    this.setState({
      msg: ''
    })
  }

  render() {
    return (
      <div className="chat-room">
        <div className="chat-room__messages">
          {!this.props.chat.loading && !this.props.chat.id && this.props.chat.messages.length === 0 && <span>Nenhum chat selecionado</span>}
          {this.props.chat.loading && <span>carregando chat</span>}
          {!this.props.chat.loading && this.props.chat.id &&
            this.state.msgs.map((msg, i) => <div key={i}>{msg}</div> )
          }
        </div>

        <div className="chat-room__input__wrapper">
          <form onSubmit={this.onMsgSubmit.bind(this)}>
            <input
              placeholder="escreva uma mensagem"
              className="chat-room__input"
              value={this.state.msg}
              onChange={this.onMsgChange.bind(this)} />
            {/* <input type="submit" value="Submit" /> */}
          </form>
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