import React from 'react';
import { shallow } from 'enzyme';
import TextAreaInput from '../../../src/components/forms/TextAreaInput';


const props = {
  identifier: '',
  controlFunc: jest.fn(),
  rows: 2,
  cols: 3,
  content: '',
  name: 'true',
  placeholder: '',
};
const wrapper = shallow(
  <TextAreaInput {...props} />
);

describe('TextAreaInput Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should render inputs and other elements', () => {
    expect(wrapper.find('.input-field').exists()).toBe(true);
    expect(wrapper.find('textarea')).toHaveLength(1);
    expect(wrapper.find('span')).toHaveLength(1);
  });
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
