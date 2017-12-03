import React from 'react';
import { shallow } from 'enzyme';
import createHistory from 'history/createMemoryHistory';
import { History, mapStateToProps }
  from '../../../src/components/library/History';
import {
  borrowedNotReturnedBooks,
  userDetails
} from './../mockData';

localStorage.setItem('userDetails', JSON.stringify(userDetails));
const props = {
  fetchAllBorrowedBooks: () => Promise.resolve(1),
  fetchBooks: () => Promise.resolve(1),
  books: borrowedNotReturnedBooks,
  history: createHistory()
};
const wrapper = shallow(<History {...props} />);

describe('History Component', () => {
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should ensure mapStateToProps returns state from store', () => {
    const storeState = {
      users: {
        user: {
          id: 1
        }
      },
      borrowsReducer: {
        borrows: borrowedNotReturnedBooks
      }
    };
    expect(mapStateToProps(storeState).userId).toEqual(1);
    expect(mapStateToProps(storeState).books).toHaveLength(4);
  });
});
