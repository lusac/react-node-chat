/* global it describe expect beforeEach */
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
import ChatHeader from '../../components/ChatHeader'

configure({ adapter: new Adapter() })

describe('ChatHeader component', () => {
  describe('snapshot', () => {
    it('without chat title', () => {
      const room = {}
      const renderedValue =  renderer.create(<ChatHeader username='xunda' room={room} />).toJSON()
      expect(renderedValue).toMatchSnapshot();
    })

    it('with chat title', () => {
      const room = { id: 1, name: 'room name' }
      const renderedValue =  renderer.create(<ChatHeader username='xunda' room={room} />).toJSON()
      expect(renderedValue).toMatchSnapshot();
    })
  })

  describe('rendered', () => {
    describe('without room title', () => {
      let wrapper, room = {}

      beforeEach(() => {
        wrapper = shallow(<ChatHeader username='xunda' room={room} />)
      })

      it('correct username', () => {
        expect(wrapper.find('.chat-header__profile__name').get(0).props.children.join('')).toBe('Olá xunda!')
      })

      it('no room title', () => {
        expect(wrapper.find('.chat-header__chat-name').get(0)).toBeUndefined()
      })
    })

    describe('with room title', () => {
      let wrapper, room = { id: 1, name: 'room name' }

      beforeEach(() => {
        wrapper = shallow(<ChatHeader username='xunda' room={room} />)
      })

      it('correct username', () => {
        expect(wrapper.find('.chat-header__profile__name').get(0).props.children.join('')).toBe('Olá xunda!')
      })

      it('correct chat title', () => {
        expect(wrapper.find('.chat-header__chat-name').get(0).props.children).toBe('room name')
      })
    })
  })
})