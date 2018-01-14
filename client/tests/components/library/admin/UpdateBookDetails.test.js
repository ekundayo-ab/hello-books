import React from 'react';
import { shallow } from 'enzyme';
import UpdateBookDetails
  from '../../../../src/components/library/admin/UpdateBookDetails';
import {
  book
} from '../../../__mocks__/mockData';


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
  it('should render update book details', () => {
    expect(wrapper.find('#update-book-details').exists()).toBe(true);
    expect(wrapper.find('#update-book-details h1').text()).toBe('White Teeth');
    expect(wrapper.find('#update-book-details h5').text()).toBe('Zadie Smith');
  });
});
