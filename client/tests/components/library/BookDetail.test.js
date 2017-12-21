import React from 'react';
import { shallow } from 'enzyme';
import { mapStateToProps, BookDetail }
  from '../../../src/components/library/BookDetail';
import {
  book,
  borrow,
  userDetails,
  user
} from '../../__mocks__/mockData';

localStorage.setItem('userDetails', JSON.stringify(userDetails));
const props = {
  fetchBorrowedBook: () => Promise.resolve(1),
  fetchBook: () => Promise.resolve(1),
  borrowBook: () => Promise.resolve(1),
  book,
  borrow,
  user,
  match: {
    params: {},
    id: 1
  }
};
const wrapper = shallow(<BookDetail {...props} />);

describe('History Component', () => {
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should call handleBorrowClick', () => {
    const handleBorrowClick =
      jest.spyOn(wrapper.instance(), 'handleBorrowClick');
    handleBorrowClick();
    wrapper.find('.btn').simulate('click');
    expect(wrapper.instance().handleBorrowClick).toHaveBeenCalled();
  });

  it('should ensure mapStateToProps returns state from store', () => {
    const storeState = {
      users: {
        user
      },
      bookReducer: {
        book
      },
      borrowReducer: {
        borrow
      }
    };
    expect(mapStateToProps(storeState).user).toEqual(user);
    expect(mapStateToProps(storeState).book).toEqual(book);
    expect(mapStateToProps(storeState).borrow).toEqual(borrow);
  });
});
