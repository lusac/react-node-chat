/* global it describe expect beforeEach */
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
import { ChatHeader } from '../../components/ChatHeader'

configure({ adapter: new Adapter() })

describe('ChatHeader component', () => {
  describe('snapshot', () => {
    it('without chat title', () => {
      const chat = { loading: true }
      const renderedValue =  renderer.create(<ChatHeader username='xunda' chat={chat} />).toJSON()
      expect(renderedValue).toMatchSnapshot();
    })

    it('with chat title', () => {
      const chat = { loading: false, id: 1 }
      const renderedValue =  renderer.create(<ChatHeader username='xunda' chat={chat} />).toJSON()
      expect(renderedValue).toMatchSnapshot();
    })
  })

  describe('rendered', () => {
    describe('without chat title', () => {
      let wrapper, chat = {}

      beforeEach(() => {
        wrapper = shallow(<ChatHeader username='xunda' chat={chat} />)
      })

      it('correct username', () => {
        expect(wrapper.find('.chat-header__profile').get(0).props.children.join('')).toBe('Olá xunda!')
      })

      it('no chat title', () => {
        expect(wrapper.find('.chat-header__chat-name').get(0)).toBeUndefined()
      })
    })

    describe('with chat title', () => {
      let wrapper, chat = { id: 1 }

      beforeEach(() => {
        wrapper = shallow(<ChatHeader username='xunda' chat={chat} />)
      })

      it('correct username', () => {
        expect(wrapper.find('.chat-header__profile').get(0).props.children.join('')).toBe('Olá xunda!')
      })

      it('correct chat title', () => {
        expect(wrapper.find('.chat-header__chat-name').get(0).props.children.join('')).toBe('chat 1')
      })
    })
  })
})