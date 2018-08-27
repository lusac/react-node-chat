/* global it describe expect beforeEach */
import React from 'react'
import { shallow, configure } from 'enzyme'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16'
import Channel from '../../components/Channel'

configure({ adapter: new Adapter() })

describe('Channel component', () => {
  describe('snapshot', () => {
    it('channel not selected', () => {
      const
        channel = {},
        username = 'xunda',
        renderedValue =  renderer.create(<Channel channel={channel} username={username} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })

    it('channel selected with no msgs', () => {
      const
        channel = { id: 1, msgs: [] },
        username = 'xunda',
        renderedValue =  renderer.create(<Channel channel={channel} username={username} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })

    it('channel selected with msgs', () => {
      const
        channel = { id: 1, msgs: [{username: 'xunda', text: 'hello!', date: new Date()}] },
        username = 'xunda',
        renderedValue =  renderer.create(<Channel channel={channel} username={username} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })
  })

  describe('rendered', () => {
    describe('channel not selected', () => {
      let wrapper, channel = {}

      beforeEach(() => {
        wrapper = shallow(<Channel channel={channel}/>)
      })

      it('correct label', () => {
        expect(wrapper.find('.channel__empty-state strong').get(0).props.children).toBe('Escolha ou crie um canal para conversar com outras pessoas!')
      })
    })

    describe('channel selected with no msgs', () => {
      let wrapper, channel = { id: 1, name: 'channel 1', msgs: [] }

      beforeEach(() => {
        wrapper = shallow(<Channel channel={channel}/>)
      })

      it('correct label', () => {
        expect(wrapper.find('.channel__section>span').get(0).props.children).toBe('nenhuma mensagem')
      })
    })

    describe('channel selected with msgs', () => {
      let wrapper, channel = { id: 1, name: 'channel 1', msgs: [{text:'hello!', username: 'xunda', date: new Date()}] }

      beforeEach(() => {
        wrapper = shallow(<Channel channel={channel}/>)
      })

      it('correct label', () => {
        expect(wrapper.find('Message').length).toBe(1)
      })
    })
  })
})