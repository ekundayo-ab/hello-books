import React from 'react';
import { shallow } from 'enzyme';
import UpdateBookDetails
  from '../../../../src/components/library/admin/UpdateBookDetails';
import {
  book
} from '../../mockData';


const props = {
  book
};

const wrapper = shallow(
  <UpdateBookDetails {...props} />
);
describe('CategoryList Component', () => {
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
