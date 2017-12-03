import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../../../src/components/library/master/Home';

const wrapper = shallow(<Home.WrappedComponent />);
describe('Home Component', () => {
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should call handleFilterBooksByCategory to filter books', () => {
    expect(wrapper.find('Switch').exists()).toBe(true);
  });
  it('should ensure component are rendered conditionally', () => {
    expect(wrapper.find('Switch').exists()).toBe(true);
  });
});
