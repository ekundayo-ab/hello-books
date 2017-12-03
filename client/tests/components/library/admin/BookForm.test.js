import React from 'react';
import { shallow } from 'enzyme';
import createHistory from 'history/createMemoryHistory';
import { BookForm, mapStateToProps }
  from '../../../../src/components/library/admin/BookForm';
import {
  categories
} from '../../mockData';


const props = {
  fetchCategories: () => Promise.resolve(1),
  saveBook: jest.fn(() => Promise.resolve(1)),
  updateBook: () => Promise.resolve(1),
  categories,
  history: createHistory()
};
const wrapper = shallow(
  <BookForm {...props} />
);

const action = wrapper.instance();

describe('BookForm Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should ensure categories are available', () => {
    expect(wrapper.instance().props).toHaveProperty('fetchCategories');
    expect(wrapper.instance().props).toHaveProperty('categories');
  });

  it('should ensure state has important book data', () => {
    expect(wrapper.instance().state).toHaveProperty('id');
    expect(wrapper.instance().state).toHaveProperty('isbn');
    expect(wrapper.instance().state).toHaveProperty('title');
    expect(wrapper.instance().state).toHaveProperty('author');
    expect(wrapper.instance().state).toHaveProperty('description');
    expect(wrapper.instance().state).toHaveProperty('quantity');
    expect(wrapper.instance().state).toHaveProperty('category');
  });

  it('should change isbn value as entered by user', () => {
    const event = { target: { name: 'isbn', value: 875 } };
    action.onChange(event);
    expect(action.state.isbn).toEqual(875);
  });
  it('should change title value as entered by user', () => {
    const event = { target: { name: 'title', value: 'Java for beginners' } };
    action.onChange(event);
    expect(action.state.title).toEqual('Java for beginners');
  });
  it('should change author value as entered by user', () => {
    const event = { target: { name: 'author', value: 'Max Java' } };
    action.onChange(event);
    expect(action.state.author).toEqual('Max Java');
  });
  it('should change quantity value as entered by user', () => {
    const event = { target: { name: 'quantity', value: 20 } };
    action.onChange(event);
    expect(action.state.quantity).toEqual(20);
  });
  it('should change description value as entered by user', () => {
    const event = {
      target: {
        name: 'description',
        value: 'A nice JAVA book for those new to the world of programming'
      }
    };
    action.onChange(event);
    expect(action.state.description)
      .toEqual('A nice JAVA book for those new to the world of programming');
  });
  it('should change category value as entered by user', () => {
    const event = { target: { name: 'category', value: 'Programming' } };
    action.onChange(event);
    expect(action.state.category).toEqual('Programming');
  });

  it('should add book when form is submitted', () => {
    const addBook = jest.spyOn(wrapper.instance(), 'handleSubmit');
    action.handleSubmit({ preventDefault: () => 1 });
    expect(addBook).toBeCalled();
    expect(props.saveBook).toBeCalled();
  });

  it('should ensure fetchCategories can be called', () => {
    const fetchCategories = jest.spyOn(props, 'fetchCategories');
    fetchCategories();
    expect(fetchCategories).toBeCalled();
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      categoryReducer: {
        categories
      }
    };
    expect(mapStateToProps(storeState).categories).toHaveLength(3);
  });
});
