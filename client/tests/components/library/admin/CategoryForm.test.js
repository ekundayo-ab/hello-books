import React from 'react';
import { mount } from 'enzyme';
import { CategoryForm }
  from '../../../../src/components/library/admin/CategoryForm';


const props = {
  saveCategory: jest.fn(() => Promise.resolve(1)),
};
const wrapper = mount(
  <CategoryForm {...props} />
);

describe('CategoryForm Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should change title value as entered by user', () => {
    const event = { target: { name: 'title', value: 875 } };
    wrapper.instance().onChange(event);
    expect(wrapper.instance().state.title).toEqual(875);
  });

  it('should add book when form is submitted', () => {
    const saveCategory = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.instance().onSubmit({ preventDefault: () => 1 });
    expect(props.saveCategory).toBeCalled();
    expect(saveCategory).toBeCalled();
  });
});
