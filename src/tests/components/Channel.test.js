/* global it describe expect beforeEach jest */
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

    it('channel already joined', () => {
      const
        channel = { id: 1, msgs: [], joined: true },
        username = 'xunda',
        renderedValue =  renderer.create(<Channel channel={channel} username={username} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })

    it('channel not joined', () => {
      const
        channel = { id: 1, msgs: [], joined: false },
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
        channel = { id: 1, msgs: [{username: 'xunda', text: 'hello!', date: new Date('Mon Aug 27 2018 11:22:33')}] },
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
      let wrapper, channel = { id: 1, name: 'channel 1', msgs: [{text:'hello!', username: 'xunda', date: new Date('Mon Aug 27 2018 11:22:33')}] }

      beforeEach(() => {
        wrapper = shallow(<Channel channel={channel}/>)
      })

      it('correct label', () => {
        expect(wrapper.find('Message').length).toBe(1)
      })
    })

    describe('channel already joined', () => {
      let wrapper, channel = { id: 1, joined: true, name: 'channel 1', msgs: [{text:'hello!', username: 'xunda', date: new Date('Mon Aug 27 2018 11:22:33')}] }

      beforeEach(() => {
        wrapper = shallow(<Channel channel={channel}/>)
      })

      it('has input and dont have button to join', () => {
        expect(wrapper.find('.channel__chat-input').length).toBe(1)
        expect(wrapper.find('.channel__footer button').length).toBe(0)
      })
    })

    describe('channel not joined', () => {
      let wrapper, channel = { id: 1, joined: false, name: 'channel 1', msgs: [{text:'hello!', username: 'xunda', date: new Date('Mon Aug 27 2018 11:22:33')}] }

      beforeEach(() => {
        wrapper = shallow(<Channel channel={channel}/>)
      })

      it('has input and dont have button to join', () => {
        expect(wrapper.find('.channel__chat-input').length).toBe(0)
        expect(wrapper.find('.channel__footer button').length).toBe(1)
      })
    })
  })

  it('onMsgChange method', () => {
    let
      channel = { id: 1, name: 'channel 1', msgs: [] },
      wrapper = shallow(<Channel channel={channel}/>)

    expect(wrapper.instance().state.msg).toBe('')
    wrapper.instance().onMsgChange({target: {value: 'hello!'}})
    expect(wrapper.instance().state.msg).toBe('hello!')
  })

  it('onMsgSubmit method', () => {
    const d = new Date('2017-06-13T04:41:20')
    Date = class extends Date {
      constructor() {
        return d
      }
    }

    let
      e = { preventDefault: () => 'oie' },
      socket = { emit: (a, b) => (a, b) },
      user = {name: 'xunda', color: 2},
      channel = { id: 1, name: 'channel 1', msgs: [] },
      wrapper = shallow(<Channel user={user} socket={socket} channel={channel}/>)

    wrapper.instance().onMsgChange({target: {value: 'hello!'}})

    const spyPreventDefault = jest.spyOn(e, 'preventDefault')
    const spyEmit = jest.spyOn(wrapper.instance().props.socket, 'emit')

    wrapper.instance().onMsgSubmit(e)

    expect(spyPreventDefault).toHaveBeenCalled()
    expect(spyEmit).toHaveBeenCalledWith('message', {"channelID": 1, "msg": {"color": 2, "date": new Date(), "text": "hello!", "username": 'xunda'}})
    expect(wrapper.instance().state.msg).toBe('')
  })

  it('joinChannel method', () => {
    let
      socket = { emit: (a, b) => (a, b) },
      user = {name: 'xunda', color: 2},
      channel = { id: 1, name: 'channel 1', msgs: [] },
      wrapper = shallow(<Channel user={user} socket={socket} channel={channel}/>)

    const spy = jest.spyOn(wrapper.instance().props.socket, 'emit')
    wrapper.instance().joinChannel()
    expect(spy).toHaveBeenCalledWith('join channel', 1)
  })
})