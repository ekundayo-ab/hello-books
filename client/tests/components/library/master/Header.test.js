import React from 'react';
import { shallow } from 'enzyme';
import createHistory from 'history/createMemoryHistory';
import { Header, mapStateToProps }
  from '../../../../src/components/library/master/Header';


const props = {
  isAdmin: 'admin',
  logout: jest.fn(),
  history: createHistory()
};
const wrapper = shallow(
  <Header {...props} />
);

describe('Header Component', () => {
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should call logout when user clicks logout link', () => {
    const handleLogout = jest.spyOn(wrapper.instance(), 'handleLogout');
    handleLogout();
    expect(wrapper.instance().handleLogout).toHaveBeenCalled();
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      users: {
        isAuthenticated: true,
        user: {
          role: 'Admin'
        }
      },
    };
    expect(mapStateToProps(storeState).isAuthenticated).toBe(true);
    expect(mapStateToProps(storeState).isAdmin).toBe('Admin');
  });
});
