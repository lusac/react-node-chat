import {
  CHATS_LOADING,
  CHATS_COMPLETED
} from '../types'

const STATE = {
  chats: [],
  loading: false
}

export function chats(state=STATE, action) {
  switch (action.type) {
    case CHATS_LOADING:
      return {
        ...state,
        loading: true
      }
    case CHATS_COMPLETED:
      return {
        ...state,
        loading: false,
        chats: action.payload
      }
    default:
      return state
  }
}