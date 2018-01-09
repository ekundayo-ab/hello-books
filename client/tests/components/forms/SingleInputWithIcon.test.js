import React from 'react';
import { shallow } from 'enzyme';
import SingleInputWithIcon
  from '../../../src/components/forms/SingleInputWithIcon';


const props = {
  identifier: '',
  controlFunc: jest.fn(),
  inputName: '',
  inputType: '',
  content: '',
  fieldError: 'true',
  iconClass: '',
};
const wrapper = shallow(
  <SingleInputWithIcon {...props} />
);

describe('SingleInputWithIcon Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should render inputs and other elements', () => {
    expect(wrapper.find('.input-field').exists()).toBe(true);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('span')).toHaveLength(1);
  });
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
