import React from 'react';
import { shallow } from 'enzyme';
import createHistory from 'history/createMemoryHistory';
import { History, mapStateToProps }
  from '../../../src/components/library/History';
import {
  borrowedNotReturnedBooks,
  userDetails
} from '../../__mocks__/mockData';

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

  it('should render history of book borrowed', () => {
    expect(wrapper.find('h3').text()).toEqual('Borrowing History');
    expect(wrapper.find('td').at(0).text()).toEqual('1');
    expect(wrapper.find('td').at(1).text()).toEqual(' Not Returned');
    expect(wrapper.find('td').at(2).text()).toEqual('Half of a Yellow Sun');
    expect(wrapper.find('td').at(3).text()).toEqual('Chimamanda Ngozi Adichie');
    expect(wrapper.find('td').at(4).text()).toEqual('November 24th 2017, 11:59 pm');
    expect(wrapper.find('td').at(5).text()).toEqual('Not Yet');
    expect(wrapper.find('td').at(6).text()).toEqual('2');
    expect(wrapper.find('td').at(7).text()).toEqual(' Not Returned');
    expect(wrapper.find('td').at(8).text()).toEqual('The Corrections');
    expect(wrapper.find('td').at(9).text()).toEqual('Jonathan Franzen');
    expect(wrapper.find('td').at(10).text()).toEqual('November 24th 2017, 11:59 pm');
    expect(wrapper.find('td').at(11).text()).toEqual('Not Yet');
    expect(wrapper.find('td').at(12).text()).toEqual('3');
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
