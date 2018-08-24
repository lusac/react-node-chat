import { combineReducers } from 'redux'
import { chat } from './chat'
import { chats } from './chats'
import { socket } from './socket'

export const rootReducer = combineReducers({
  chat,
  chats,
  socket
})
