import React from 'react';
import { shallow } from 'enzyme';
import { SignInForm } from '../../../src/components/landing/SignInForm';


const props = {
  login: jest.fn(() => Promise.resolve(1)),
  history: {
    push: jest.fn(() => Promise.resolve(1)),
  },
  location: {
    pathname: '/',
  }
};
const wrapper = shallow(
  <SignInForm {...props} />
);

const action = wrapper.instance();
describe('SignInForm Component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render form inputs and submit button', () => {
    expect(wrapper.find('SingleInput').exists()).toBe(true);
    expect(wrapper.find('SingleInput')).toHaveLength(2);
    expect(wrapper.find('button').at(0).text()).toEqual(' Login');
  });

  it('should change identifier value as entered by user', () => {
    const event = { target: { name: 'identifier', value: 'ekundayo' } };
    action.onChange(event);
    expect(action.state.identifier).toEqual('ekundayo');
  });

  it('should change password value as entered by user', () => {
    const event = { target: { name: 'password', value: '87sY^%!lsd' } };
    action.onChange(event);
    expect(action.state.password).toEqual('87sY^%!lsd');
  });

  it('should call onSubmit when form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'identifier', value: 'ekundayo' }
    };
    const onSubmit = jest.spyOn(action, 'onSubmit');
    onSubmit(event);
    action.onChange(event);
    expect(props.login).toBeCalled();
    expect(onSubmit).toBeCalled();
  });
});
