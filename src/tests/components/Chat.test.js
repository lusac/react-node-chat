/* global it describe expect beforeEach */
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
import Chat from '../../components/Chat'

configure({ adapter: new Adapter() })

describe('Chat component', () => {
  describe('snapshot', () => {
    it('room not selected', () => {
      const room = {}
      const renderedValue =  renderer.create(<Chat room={room} />).toJSON()
      expect(renderedValue).toMatchSnapshot();
    })

    it('room selected', () => {
      const room = { id: 1, msgs: [] }
      const renderedValue =  renderer.create(<Chat room={room} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })
  })

  describe('rendered', () => {
    describe('room not selected', () => {
      let wrapper, room = {}

      beforeEach(() => {
        wrapper = shallow(<Chat room={room}/>)
      })

      it('correct label', () => {
        expect(wrapper.find('span').get(0).props.children).toBe('Nenhum chat selecionado')
      });
    })

    describe('room selected', () => {
      let wrapper, room = { id: 1, msgs: ['mensagens chat 1'] }

      beforeEach(() => {
        wrapper = shallow(<Chat room={room}/>)
      })

      it('correct label', () => {
        expect(wrapper.find('.chat-room__messages div').get(0).props.children).toBe('mensagens chat 1')
      });
    })
  })
})