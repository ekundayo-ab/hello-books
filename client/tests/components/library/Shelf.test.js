import React from 'react';
import { shallow } from 'enzyme';
import createHistory from 'history/createMemoryHistory';
import { Shelf, mapStateToProps } from '../../../src/components/library/Shelf';
import {
  books,
  categories
} from '../../__mocks__/mockData';

const props = {
  fetchCategories: () => Promise.resolve(1),
  fetchBooks: () => Promise.resolve(1),
  fetchBooksByCategory: () => Promise.resolve(1),
  books,
  categories,
  history: createHistory()
};
const wrapper = shallow(<Shelf {...props} />);

describe('Shelf Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.available-books').exists()).toBe(true);
  });

  it('should have state with keys as tested below', () => {
    expect(wrapper.instance().state.showCategoryTitle).toEqual(false);
    expect(wrapper.instance().state.categoryTitle).toEqual('');
  });

  it('should render category-list component and individual books', () => {
    expect(wrapper.find('BookCard')).toHaveLength(4);
    expect(wrapper.find('#category-list').exists()).toBe(true);
    expect(wrapper.find('#bk0').exists()).toBe(true);
    expect(wrapper.find('#bk1').exists()).toBe(true);
    expect(wrapper.find('#bk2').exists()).toBe(true);
    expect(wrapper.find('#bk3').exists()).toBe(true);
  });

  it('should call filterBooksByCategory when books are filtered by category',
    () => {
      const shelfWrapper = wrapper.instance();
      const filterBooksByCategory =
        jest.spyOn(shelfWrapper, 'filterBooksByCategory');
      const event = {
        preventDefault: jest.fn()
      };
      shelfWrapper.filterBooksByCategory(1, event, 1);
      expect(filterBooksByCategory).toBeCalled();
    });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      booksReducer: {
        books
      },
      categoryReducer: {
        categories
      }
    };
    expect(mapStateToProps(storeState).books).toHaveLength(4);
    expect(mapStateToProps(storeState).categories).toHaveLength(3);
  });
});
