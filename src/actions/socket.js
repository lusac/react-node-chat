import {
  SOCKET_LOADING,
  SOCKET_COMPLETED
} from '../types'
import socketIOClient from 'socket.io-client'

export function connectSocket() {
  return (dispatch) => {
    dispatch({type: SOCKET_LOADING, payload: true})
    var socket = socketIOClient('http://localhost:3001')

    socket.on('connect', () => {
      dispatch({type: SOCKET_COMPLETED, payload: {socket: socket}})
    });
  }
}