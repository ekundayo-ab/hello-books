import React from 'react';
import { shallow } from 'enzyme';
import CategoryList
  from '../../../../src/components/library/category/CategoryList';
import {
  categories
} from '../../mockData';


const props = {
  handleFilterBooksByCategory: jest.fn(),
  categories
};
const wrapper = shallow(
  <CategoryList {...props} />
);


describe('CategoryList Component', () => {
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render without crashing', () => {
    wrapper.find('a').at(0).simulate('click');
    expect(props.handleFilterBooksByCategory).toHaveBeenCalled();
  });

  it('should have categories loaded', () => {
    expect(wrapper.instance().props.categories).toHaveLength(3);
  });
});
