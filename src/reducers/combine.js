import { combineReducers } from 'redux'
import { chat } from './chat'
import { chats } from './chats'

export const rootReducer = combineReducers({
  chat,
  chats
})
