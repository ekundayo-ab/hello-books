import React from 'react';
import { shallow } from 'enzyme';
import createHistory from 'history/createMemoryHistory';
import BookForm from '../../../../src/components/library/admin/BookForm';
import {
  categories
} from '../../../__mocks__/mockData';


const props = {
  submitForm: jest.fn(() => Promise.resolve(1)),
  formChange: jest.fn(() => Promise.resolve(1)),
  uploadFile: jest.fn(() => Promise.resolve(1)),
  loading: false,
  dropzoneLoader: false,
  categories,
  history: createHistory()
};
const wrapper = shallow(
  <BookForm {...props} />
);

describe('BookForm Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should ensure categories are available', () => {
    expect(wrapper.instance().props).toHaveProperty('submitForm');
    expect(wrapper.instance().props).toHaveProperty('formChange');
    expect(wrapper.instance().props).toHaveProperty('uploadFile');
    expect(wrapper.instance().props).toHaveProperty('categories');
    expect(wrapper.instance().props).toHaveProperty('loading');
    expect(wrapper.instance().props).toHaveProperty('dropzoneLoader');
  });
});
