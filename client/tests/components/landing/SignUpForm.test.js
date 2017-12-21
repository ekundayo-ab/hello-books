import React from 'react';
import { shallow } from 'enzyme';
import { SignUpForm } from '../../../src/components/landing/SignupForm';
import { googleDetails } from '../../__mocks__/testData';


const props = {
  userSignUpRequest: jest.fn(() => Promise.resolve(1)),
  googleAuth: jest.fn(() => Promise.resolve(1)),
  isUserExists: jest.fn(() => Promise.resolve(1)),
  history: {
    push: jest.fn(() => Promise.resolve(1)),
  },
  location: {
    pathname: '/',
  }
};
const wrapper = shallow(
  <SignUpForm {...props} />
);

const action = wrapper.instance();
describe('SignUpForm Component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render form inputs and submit button', () => {
    expect(wrapper.find('SingleInput').exists()).toBe(true);
    expect(wrapper.find('SingleInput')).toHaveLength(4);
    expect(wrapper.find('button').at(0).text()).toEqual(' Register');
    expect(wrapper.find('.google-btn').exists()).toBe(true);
  });

  it('should change identifier value as entered by user', () => {
    const event = { target: { name: 'username', value: 'ekundayo' } };
    action.onChange(event);
    expect(action.state.username).toEqual('ekundayo');
  });

  it('should change identifier value as entered by user', () => {
    const event = { target: { name: 'email', value: 'ekprogs@gmail.com' } };
    action.onChange(event);
    expect(action.state.email).toEqual('ekprogs@gmail.com');
  });

  it('should change password value as entered by user', () => {
    const event = { target: { name: 'password', value: '87sY^%!lsd' } };
    action.onChange(event);
    expect(action.state.password).toEqual('87sY^%!lsd');
  });

  it('should change password value as entered by user', () => {
    const event =
      { target: { name: 'passwordConfirmation', value: '87sY^%!lsd' } };
    action.onChange(event);
    expect(action.state.passwordConfirmation).toEqual('87sY^%!lsd');
  });

  it('should call onSubmit when form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'passwordConfirmation', value: '87sY^%!lsd' }
    };
    const onSubmit = jest.spyOn(action, 'onSubmit');
    action.onSubmit(event);
    action.onChange(event);
    expect(action.props.userSignUpRequest).toBeCalled();
    expect(onSubmit).toBeCalled();
  });

  it('should call checkUserExists to check for username or email', () => {
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'passwordConfirmation', value: '87sY^%!lsd' }
    };
    const checkUserExists = jest.spyOn(action, 'checkUserExists');
    action.checkUserExists(event);
    expect(checkUserExists).toBeCalled();
    expect(props.isUserExists).toBeCalled();
  });

  it('should call responseGoogle to sign in user with gmail', () => {
    const responseGoogle = jest.spyOn(action, 'responseGoogle');
    action.responseGoogle(googleDetails);
    expect(props.googleAuth).toBeCalled();
    expect(responseGoogle).toBeCalled();
  });
});
