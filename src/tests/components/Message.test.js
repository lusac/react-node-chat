/* global it describe expect */
import React from 'react'
import { shallow, configure } from 'enzyme'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16'
import Message from '../../components/Message'

configure({ adapter: new Adapter() })

describe('Message component', () => {
  describe('snapshot', () => {
    it('channel not selected', () => {
      const
        message = {username: 'xunda', text: 'hello!', date: new Date()},
        renderedValue =  renderer.create(<Message message={message} />).toJSON()
      expect(renderedValue).toMatchSnapshot()
    })
  })

  it('formatDate method', () => {
    let
      message = {username: 'xunda', text: 'hello!', date: new Date()},
      wrapper = shallow(<Message message={message}/>),
      date = wrapper.instance().formatDate(new Date('Mon Aug 27 2018 11:22:33'))
    expect(date).toBe('11:22 AM')
  })
})