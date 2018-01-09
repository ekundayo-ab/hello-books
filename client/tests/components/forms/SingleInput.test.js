import React from 'react';
import { shallow } from 'enzyme';
import SingleInput from '../../../src/components/forms/SingleInput';


const props = {
  identifier: '',
  controlFunc: jest.fn(),
  inputName: '',
  inputType: '',
  content: '',
  fieldError: 'true',
};
const wrapper = shallow(
  <SingleInput {...props} />
);

describe('SingleInput Component', () => {
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
