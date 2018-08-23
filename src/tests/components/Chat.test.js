/* global it describe expect beforeEach */
import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
import { Chat } from '../../components/Chat'

configure({ adapter: new Adapter() })

describe('Chat component', () => {
  describe('snapshot', () => {
    it('chat not loaded', () => {
      const chat = { loading: false, messages: [] }
      const renderedValue =  renderer.create(<Chat chat={chat} />).toJSON()
      expect(renderedValue).toMatchSnapshot();
    })

    it('chat loading', () => {
      const chat = { loading: true }
      const renderedValue =  renderer.create(<Chat chat={chat} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })

    it('chat loaded', () => {
      const chat = { loading: false, id: 1, messages: [] }
      const renderedValue =  renderer.create(<Chat chat={chat} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })
  })

  describe('rendered', () => {
    describe('chat not loaded', () => {
      let wrapper, chat = { loading: false, messages: [] }

      beforeEach(() => {
        wrapper = shallow(<Chat chat={chat}/>)
      })

      it('correct label', () => {
        expect(wrapper.find('span').get(0).props.children).toBe('Nenhum chat selecionado')
      });
    })

    describe('chat loading', () => {
      let wrapper, chat = { loading: true }

      beforeEach(() => {
        wrapper = shallow(<Chat chat={chat}/>)
      })

      it('correct label', () => {
        expect(wrapper.find('span').get(0).props.children).toBe('carregando chat')
      });
    })

    describe('chat loaded', () => {
      let wrapper, chat = { loading: false, id: 1, messages: [] }

      beforeEach(() => {
        wrapper = shallow(<Chat chat={chat}/>)
      })

      it('correct label', () => {
        expect(wrapper.find('span').get(0).props.children.join(' ')).toBe('mensagens chat 1')
      });
    })
  })
})