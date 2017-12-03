import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../../src/components/App';


const props = {
  location: {
    pathname: '/',
  }
};
const wrapper = shallow(
  <App {...props} />
);

describe('BookForm Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
