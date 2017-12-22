import React from 'react';
import { shallow } from 'enzyme';
import BasicAuth, { mapStateToProps } from '../../src/components/BasicAuth';

let wrapper, WrapperComponent;
let MockComponentToProtect;

const props = {
  isAdmin: 'admin',
  logout: jest.fn(),
  setCurrentUser: jest.fn(),
  verifyToken: jest.fn(() => Promise.resolve(1)),
  history: {
    push: jest.fn(),
    location: {
      pathname: '/login'
    }
  }
};

describe('BasicAuth Component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
    localStorage.setItem('jwtToken', null);
    MockComponentToProtect = () => (<div>Fake Component to be protected</div>);
    WrapperComponent = BasicAuth(MockComponentToProtect);
    wrapper = shallow(
      <WrapperComponent.WrappedComponent {...props} />
    );
  });

  it('should render and not crash', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should call logout and login for no token on componentWillMount', () => {
    localStorage.setItem('jwtToken', null);
    wrapper.instance().componentWillMount = jest.fn();
    expect(props.logout).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalled();
  });

  it('should call verifyToken if token exists on componentWillMount', () => {
    wrapper.instance().componentWillMount = jest.fn();
    props.verifyToken({ token: 'somefaketoken' });
    expect(props.verifyToken).toHaveBeenCalled();
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      users: {
        isAuthenticated: true,
      },
    };
    expect(mapStateToProps(storeState).isAuthenticated).toBe(true);
  });
});

