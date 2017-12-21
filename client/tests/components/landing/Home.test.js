import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../../src/components/landing/Home';


const props = {
  location: {
    pathname: '/',
  },
  history: {
    push: jest.fn(() => Promise.resolve(1)),
  },
};
const wrapper = shallow(
  <Home {...props} />
);

describe('BookForm Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should check for token and login user automatically if it exists', () => {
    localStorage.setItem('jwtToken', 'fakeTokenValue');
    wrapper.instance().componentWillMount();
    expect(props.history.push).toBeCalled();
  });
});
