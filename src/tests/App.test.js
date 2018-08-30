/* global it document describe expect beforeEach */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16'
import App from '../App';
import ChannelList from '../components/ChannelList';

configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Snapshot', () => {
  it('Initial', () => {
    const renderedValue =  renderer.create(<App />).toJSON()
    expect(renderedValue).toMatchSnapshot()
  })
})

describe('Rendered', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('should render chat after setting the username', () => {
    wrapper.instance().draftUsername = 'oie'
    wrapper.find('.form-choose-name form').at(0).simulate('submit', { preventDefault: () => {}, target: {} })
    expect(wrapper.find('ChannelList').at(0).text()).toBe('<ChannelList />')
    expect(wrapper.find('Channel').at(0).text()).toBe('<Channel />')
  })
})
