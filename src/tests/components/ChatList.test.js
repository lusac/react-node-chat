/* global it describe expect beforeEach */
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
import { ChatList } from '../../components/ChatList'

configure({ adapter: new Adapter() })

describe('ChatList component', () => {
  describe('snapshot', () => {
    it('list loading', () => {
      const chatList = { loading: true }
      const renderedValue =  renderer.create(<ChatList chats={chatList} getChats={() => {}} getChat={() => {}} />).toJSON()
      expect(renderedValue).toMatchSnapshot();
    })

    it('list loaded', () => {
      const chatList = { loading: false, chats: [] }
      const renderedValue =  renderer.create(<ChatList chats={chatList} getChats={() => {}} getChat={() => {}} />).toJSON()
      expect(renderedValue).toMatchSnapshot();
    })
  })

  describe('rendered', () => {
    describe('list loading', () => {
      let wrapper, chatList = { loading: true }

      beforeEach(() => {
        wrapper = shallow(<ChatList chats={chatList} getChats={() => {}} getChat={() => {}} />)
      })

      it('correct label', () => {
        expect(wrapper.find('span').get(0).props.children).toBe('loading...')
      });
    })

    describe('list loaded', () => {
      let wrapper, chatList = { loading: false, chats: [{id:1, name: 'chat1'}, {id:2, name: 'chat2'}, {id:3, name: 'chat3'}] }

      beforeEach(() => {
        wrapper = shallow(<ChatList chats={chatList} getChats={() => {}} getChat={() => {}} />)
      })

      it('correct label', () => {
        expect(wrapper.find('span').get(0).props.children).toBe('chat1')
        expect(wrapper.find('span').get(1).props.children).toBe('chat2')
        expect(wrapper.find('span').get(2).props.children).toBe('chat3')
      });
    })
  })
})