import {
  CHAT_LOADING,
  CHAT_COMPLETED
} from '../types'

const STATE = {
  id: null,
  messages: [],
  loading: false
}

export function chat(state=STATE, action) {
  switch (action.type) {
    case CHAT_LOADING:
      return {
        ...state,
        loading: true
      }
    case CHAT_COMPLETED:
      return {
        ...state,
        loading: false,
        id: action.payload.id,
        messages: action.payload.messages
      }
    default:
      return state
  }
}