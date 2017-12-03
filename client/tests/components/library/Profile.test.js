import React from 'react';
import { shallow } from 'enzyme';
import createHistory from 'history/createMemoryHistory';
import { Profile, mapStateToProps }
  from '../../../src/components/library/Profile';
import {
  user,
  borrowedNotReturnedBooks,
  userDetails
} from './../mockData';

localStorage.setItem('userDetails', JSON.stringify(userDetails));

const props = {
  location: { pathname: '/' },
  getBorrowedNotReturned: () => Promise.resolve(1),
  returnBook: () => Promise.resolve(1),
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

  it('should ensure mapStateToProps returns state from store', () => {
    const storeState = {
      users: {
        user
      },
      borrowsReducer: {
        borrows: borrowedNotReturnedBooks
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
