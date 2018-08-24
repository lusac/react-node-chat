import {
  SOCKET_LOADING,
  SOCKET_COMPLETED
} from '../types'

const STATE = {
  socket: null,
  loading: false
}

export function socket(state=STATE, action) {
  switch (action.type) {
    case SOCKET_LOADING:
      return {
        ...state,
        loading: true
      }
    case SOCKET_COMPLETED:
      return {
        ...state,
        loading: false,
        socket: action.payload.socket
      }
    default:
      return state
  }
}