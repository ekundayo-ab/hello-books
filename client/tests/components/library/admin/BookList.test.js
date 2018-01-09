import React from 'react';
import { shallow } from 'enzyme';
import BookList
  from '../../../../src/components/library/admin/BookList';
import {
  books
} from '../../../__mocks__/mockData';


const props = {
  handleDelete: jest.fn(),
  books
};
const wrapper = shallow(
  <BookList {...props} />
);


describe('CategoryList Component', () => {
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should call handleDelete to delete book', () => {
    wrapper.find('#delete-book-btn9').simulate('click');
    expect(props.handleDelete).toHaveBeenCalled();
  });

  it('should have books loaded', () => {
    expect(wrapper.instance().props.books).toHaveLength(4);
  });
});
