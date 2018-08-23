/* global setTimeout */

import {
  CHATS_LOADING,
  CHATS_COMPLETED
} from '../types'

export function getChats() {
  return (dispatch) => {
    dispatch({type: CHATS_LOADING, payload: true})
    setTimeout(function() {
      let data = [
        {id:1, name:'room1'},
        {id:2, name:'room2'},
        {id:3, name:'room3'},
        {id:4, name:'room4'}
      ]
      dispatch({type: CHATS_COMPLETED, payload: data})
    }, 500)
  }
}