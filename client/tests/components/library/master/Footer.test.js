import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../../src/components/library/master/Footer';

const wrapper = shallow(<Footer />);
describe('Footer Component', () => {
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
