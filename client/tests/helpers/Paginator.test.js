import React from 'react';
import { shallow } from 'enzyme';
import createHistory from 'history/createMemoryHistory';
import { Paginator, mapStateToProps } from '../../src/helpers/Paginator';
import {
  books,
  categories
} from '../__mocks__/mockData';

const props = {
  pageId: 1,
  pages: [1, 2],
  pageName: 'admin',
  location: {
    pathname: '/',
  },
  redirect: {
    push: jest.fn(),
    location: { search: '?page=1' }
  },
  paginate: jest.fn(() => Promise.resolve(1)),
  setCurrentPage: jest.fn(() => Promise.resolve(1)),
  fetchData: jest.fn(() => Promise.resolve(1)),
  history: createHistory(),
};
const wrapper = shallow(
  <Paginator {...props} />
);

describe('BookForm Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should call paginate after component mounts', () => {
    expect(props.paginate).toBeCalled();
  });

  it('should call nextPage for next pagination', () => {
    const handleNextPage = jest.spyOn(wrapper.instance(), 'nextPage');
    wrapper.instance().nextPage();
    expect(handleNextPage).toBeCalled();
  });

  it('should call prevPage for previous pagination', () => {
    const handlePrevPage = jest.spyOn(wrapper.instance(), 'prevPage');
    handlePrevPage();
    expect(handlePrevPage).toBeCalled();
    wrapper.setProps({ pageId: 5 });
    expect(props.redirect.push).toBeCalled();
  });
  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      paginationReducer: {
        pages: [1, 2, 3],
        pageId: 3
      },
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
