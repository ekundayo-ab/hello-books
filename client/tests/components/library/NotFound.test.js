import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../../src/components/library/NotFound';


const wrapper = shallow(
  <NotFound />
);

describe('NotFound Component', () => {
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
