/* global it describe expect beforeEach */
import React from 'react'
import { shallow, configure } from 'enzyme'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16'
import ChannelList from '../../components/ChannelList';

configure({ adapter: new Adapter() })

describe('ChannelList component', () => {
  describe('snapshot', () => {
    it('empty list', () => {
      const channels = {}
      const renderedValue =  renderer.create(<ChannelList channels={channels} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })

    it('with channels', () => {
      const notifications = {}
      const channel = {id:2, name:'channel 2'}
      const channels = { 1:{id:1, name:'channel 1'}, 2:{id:2, name:'channel 2'}, 3:{id:3, name:'channel 3'}}
      const renderedValue =  renderer.create(<ChannelList notifications={notifications} channel={channel} channels={channels} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })

    it('with notifications', () => {
      const
        notifications = {1: 3, 2: 0, 3: 10},
        channel = {id:2, name:'channel 2'},
        channels = { 1:{id:1, name:'channel 1'}, 2:{id:2, name:'channel 2'}, 3:{id:3, name:'channel 3'}},
        renderedValue =  renderer.create(<ChannelList notifications={notifications} channel={channel} channels={channels} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })
  })

  describe('rendered', () => {
    let wrapper
    const
      notifications = {1: 3, 2: 0, 3: 10},
      channel = {id:2, name:'channel 2'},
      channels = { 1:{id:1, name:'channel 1'}, 2:{id:2, name:'channel 2'}, 3:{id:3, name:'channel 3'}}

    beforeEach(() => {
      wrapper = shallow(<ChannelList notifications={notifications} channel={channel} channels={channels} />)
    })

    it('correct label', () => {
      expect(wrapper.find('.channel-list__name').at(0).text()).toBe('# channel 1')
      expect(wrapper.find('.channel-list__name').at(1).text()).toBe('# channel 2')
      expect(wrapper.find('.channel-list__name').at(2).text()).toBe('# channel 3')
    })

    it('correct badges', () => {
      expect(wrapper.find('.badge').get(0).props.children).toBe(3)
      expect(wrapper.find('.badge').get(1).props.children).toBe(10)
    })
  })
})