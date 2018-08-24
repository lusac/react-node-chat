/* global it describe expect beforeEach */
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
import ChatList from '../../components/ChatList'

configure({ adapter: new Adapter() })

describe('ChatList component', () => {
  describe('snapshot', () => {
    it('empty list', () => {
      const rooms = {}
      const renderedValue =  renderer.create(<rooms rooms={rooms} />).toJSON()
      expect(renderedValue).toMatchSnapshot();
    })

    it('with rooms', () => {
      const rooms = { 1:{id:1, name:'room 1'}, 2:{id:2, name:'room 2'}, 3:{id:3, name:'room 3'}}
      const renderedValue =  renderer.create(<ChatList rooms={rooms} />).toJSON()
      expect(renderedValue).toMatchSnapshot();
    })
  })

  describe('rendered', () => {
    describe('list loaded', () => {
      let wrapper, rooms = { 1:{id:1, name:'room 1'}, 2:{id:2, name:'room 2'}, 3:{id:3, name:'room 3'}}

      beforeEach(() => {
        wrapper = shallow(<ChatList rooms={rooms} />)
      })

      it('correct label', () => {
        expect(wrapper.find('span').get(0).props.children).toBe('room 1')
        expect(wrapper.find('span').get(1).props.children).toBe('room 2')
        expect(wrapper.find('span').get(2).props.children).toBe('room 3')
      })
    })
  })
})