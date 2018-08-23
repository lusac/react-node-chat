/* global setTimeout */

import {
  CHAT_LOADING,
  CHAT_COMPLETED
} from '../types'

export function getChat(chatID) {
  return (dispatch) => {
    dispatch({type: CHAT_LOADING, payload: true})
    setTimeout(function() {
      let data = {
        id: chatID,
        messages: [{text: 'oie1'}, {text: 'oie2'}, {text: 'oie3'}]
      }
      dispatch({type: CHAT_COMPLETED, payload: data})
    }, 500)
  }
}