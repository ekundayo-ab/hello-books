import React from 'react';
import { shallow } from 'enzyme';
import createHistory from 'history/createMemoryHistory';
import { Profile, mapStateToProps }
  from '../../../src/components/library/Profile';
import {
  user,
  borrowedNotReturnedBooks,
  userDetails
} from '../../__mocks__/mockData';

localStorage.setItem('userDetails', JSON.stringify(userDetails));

const props = {
  location: { pathname: '/' },
  getBorrowedNotReturned: () => Promise.resolve(1),
  returnBook: () => Promise.resolve(1),
  setCurrentPage: () => Promise.resolve(1),
  user,
  books: borrowedNotReturnedBooks,
  history: createHistory()
};

const wrapper = shallow(
  <Profile {...props} />
);
const wrapInstance = wrapper.instance();
describe('Profile Component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });

  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render form for changing password', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('should change old password value as entered by user', () => {
    const event = { target: { name: 'oldPass', value: 'oldSeCret' } };
    wrapInstance.onChange(event);
    expect(wrapInstance.state.oldPass).toEqual('oldSeCret');
  });

  it('should change new password value as entered by user', () => {
    const event = { target: { name: 'newPass', value: 'newSecret' } };
    wrapInstance.onChange(event);
    expect(wrapInstance.state.newPass).toEqual('newSecret');
  });

  it('should change new password confirmation value as entered by user', () => {
    const event = {
      target: {
        name: 'newPassConfirm',
        value: 'newSecret'
      }
    };
    wrapInstance.onChange(event);
    expect(wrapInstance.state.newPassConfirm).toEqual('newSecret');
  });

  it('should render info & details section', () => {
    expect(wrapper.find('h4').text()).toEqual('Info & Details');
    expect(wrapper.find('p').at(0).text()).toEqual('Total Books Borrowed');
    expect(wrapper.find('p').at(1).text()).toEqual('0');
    expect(wrapper.find('p').at(2).text()).toEqual('Level');
    expect(wrapper.find('p').at(3).text()).toEqual('bronze');
    expect(wrapper.find('p').at(4).text()).toEqual('Borrow Credit');
    expect(wrapper.find('p').at(5).text()).toEqual('2');
    expect(wrapper.find('p').at(0).text()).toEqual('Total Books Borrowed');
    expect(wrapper.find('p').at(0).text()).toEqual('Total Books Borrowed');
    expect(wrapper.find('p').at(0).text()).toEqual('Total Books Borrowed');
  });

  it('should render library guide section', () => {
    expect(wrapper.find('h3').at(1).text()).toEqual('Library Guide');
    expect(wrapper.find('h5').at(1).text())
      .toEqual('Default Membership Points');
    expect(wrapper.find('h5').at(2).text())
      .toEqual('Borrowing Modalities');
    expect(wrapper.find('h5').at(3).text())
      .toEqual(' Membership Upgrade Eligibility ');
    expect(wrapper.find('.small p').at(0).text().slice(2, 28))
      .toEqual('Bronze - 2 Credit Points');
    expect(wrapper.find('.small p').at(3).text().slice(2, 40))
      .toEqual('Credit point deducted for every borrow');
    expect(wrapper.find('.small p').at(6).text().slice(2, 42))
      .toEqual('Bronze to Silver - Minimum of 10 borrows');
  });

  it('should render password change card with form', () => {
    expect(wrapper.find('.change-password-card').exists()).toBe(true);
    expect(wrapper.find('SingleInput')).toHaveLength(3);
    expect(wrapper.find('button[type="submit"]').text())
      .toEqual(' Change Password');
  });

  it('should render un-returned books with details', () => {
    expect(wrapper.find('h3').at(2).text()).toBe('Unreturned Books');
    expect(wrapper.find('td').at(2).text()).toBe('Half of a Yellow Sun');
    expect(wrapper.find('td').at(3).text()).toBe('Chimamanda Ngozi Adichie');
    expect(wrapper.find('td').at(4).text())
      .toBe('November 24th 2017, 11:59 pm');
    expect(wrapper.find('#return-btn1').text()).toBe('Return');
    expect(wrapper.find('td').at(8).text()).toBe('The Corrections');
    expect(wrapper.find('td').at(9).text()).toBe('Jonathan Franzen');
    expect(wrapper.find('td').at(10).text())
      .toBe('November 24th 2017, 11:59 pm');
    expect(wrapper.find('#return-btn2').text()).toBe('Return');
  });

  it('should not render pagination component', () => {
    expect(wrapper.find('Paginator').exists()).toBe(false);
  });

  it('should ensure mapStateToProps returns state from store', () => {
    const storeState = {
      users: {
        user
      },
      returnsReducer: {
        returns: borrowedNotReturnedBooks
      }
    };
    expect(mapStateToProps(storeState).user.id).toEqual(1);
    expect(mapStateToProps(storeState).user.username).toEqual('ekundayo');
    expect(mapStateToProps(storeState).books).toHaveLength(4);
  });

  it('should call handleBookReturn when return book button is clicked', () => {
    jest.spyOn(wrapInstance, 'handleBookReturn');
    wrapper.find('#return-btn0').simulate('click');
    expect(wrapInstance.handleBookReturn).toHaveBeenCalled();
  });

  it('should call handleSubmit when submit' +
  ' button is clicked to change password', () => {
    const handleSubmitSpy = jest.spyOn(wrapInstance, 'handleSubmit');
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should ensure required elements are rendered', () => {
    expect(wrapper.find('h4').text()).toEqual('Info & Details');
    expect(wrapper.find('h3').at(1).text()).toEqual('Library Guide');
    expect(wrapper.find('h3').at(2).text()).toEqual('Unreturned Books');
  });
});
