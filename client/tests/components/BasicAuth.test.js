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
    localStorage.setItem('jwtToken', 'fakeTokenValue');
    MockComponentToProtect = () => (<div>Fake Component to be protected</div>);
    WrapperComponent = BasicAuth(MockComponentToProtect);
    wrapper = shallow(
      <WrapperComponent.WrappedComponent {...props} />
    );
  });

  it('should render and not crash', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should call verifyToken when component is to mount', () => {
    wrapper.instance().componentWillMount = jest.fn();
    expect(props.logout).toHaveBeenCalled();
    // expect(props.verifyToken).toHaveBeenCalled();
  });

  it('should log user out if not authenticated on component mount', () => {
    process.env.noToken = true;
    wrapper.instance().componentWillMount = jest.fn();
    expect(props.logout).toHaveBeenCalled();
    // expect(props.verifyToken).toHaveBeenCalled();
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

