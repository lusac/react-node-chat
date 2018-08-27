/* global it describe expect beforeEach jest */
import React from 'react'
import { shallow, configure } from 'enzyme'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16'
import NewChannelModal from '../../components/NewChannelModal'

configure({ adapter: new Adapter() })

describe('NewChannelModal component', () => {
  describe('snapshot', () => {
    it('default', () => {
      const
        renderedValue =  renderer.create(<NewChannelModal toggleModal={() => 'hello!' } />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })
  })

  describe('methods', () => {
    let
      wrapper,
      socket = {
        emit: (a, b) => (a, b)
      }

    beforeEach(() => {
      wrapper = shallow(<NewChannelModal socket={socket} toggleModal={() => 'Hello!' } />)
    })

    it('createChat method', () => {
      const spy = jest.spyOn(wrapper.instance().props.socket, 'emit')
      wrapper.instance().createChat('My Channel')
      expect(spy).toHaveBeenCalledWith('create channel', 'My Channel')
    })

    it('onChatNameChange method', () => {
      expect(wrapper.instance().state.channelName).toBe('')
      wrapper.instance().onChatNameChange({target: {value: 'new name'}})
      expect(wrapper.instance().state.channelName).toBe('new name')
    })

    it('onFormSubmit method', () => {
      const e = { preventDefault: () => 'oie' }
      wrapper.instance().onChatNameChange({target: {value: 'new name'}})

      const spyPreventDefault = jest.spyOn(e, 'preventDefault')
      const spyCreateChat = jest.spyOn(wrapper.instance(), 'createChat')
      // const spyToggleModal = jest.spyOn(wrapper.instance().props, 'toggleModal')

      wrapper.instance().onFormSubmit(e)

      expect(spyPreventDefault).toHaveBeenCalled()
      expect(spyCreateChat).toHaveBeenCalledWith(wrapper.instance().state.channelName)
      // expect(spyToggleModal).toHaveBeenCalled()
    })
  })
})