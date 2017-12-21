import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../src/components/landing/Header';


const props = {
  location: {
    pathname: '/',
  }
};
const wrapper = shallow(
  <Header {...props} />
);

describe('Header Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
