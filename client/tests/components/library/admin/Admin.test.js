import React from 'react';
import { shallow } from 'enzyme';
import createHistory from 'history/createMemoryHistory';
import { Admin, mapStateToProps }
  from '../../../../src/components/library/admin/Admin';
import {
  books,
  book,
  categories,
  userDetails,
  borrows,
} from '../../../__mocks__/mockData';

localStorage.setItem('userDetails', JSON.stringify(userDetails));

const props = {
  fetchCategories: () => Promise.resolve(1),
  fetchBooks: () => Promise.resolve(1),
  fetchBooksByCategory: jest.fn(() => Promise.resolve(1)),
  fetchAllBorrowedBooks: jest.fn(() => Promise.resolve(1)),
  deleteBook: jest.fn(() => Promise.resolve(1)),
  setCurrentPage: jest.fn(() => Promise.resolve(1)),
  saveBook: jest.fn(() => Promise.resolve(1)),
  updateBook: jest.fn(() => Promise.resolve(1)),
  books,
  categories,
  borrows,
  history: createHistory()
};

const wrapper = shallow(<Admin {...props} />);

describe('Admin Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render admin dashboard subheadings', () => {
    expect(wrapper.find('h3')).toHaveLength(2);
    expect(wrapper.find('h3').at(0).text()).toEqual('Admin Dashboard      ');
    expect(wrapper.find('h3').at(1).text()).toEqual(' All Notifications');
  });

  it('should render modal triggers for category and book form', () => {
    expect(wrapper.find('#book-form-modal').exists()).toBe(true);
    expect(wrapper.find('#category-form-modal').exists()).toBe(true);
  });

  it('should render pagination component', () => {
    expect(wrapper.find('Connect(Paginator)').exists()).toBe(true);
    expect(wrapper.find('Connect(Paginator)').length).toEqual(1);
  });

  it('should render category list, book list component', () => {
    expect(wrapper.find('#category-list').exists()).toBe(true);
    expect(wrapper.find('#book-list').exists()).toBe(true);
  });

  it('should render notifications list', () => {
    expect(wrapper.find('ul li').at(4).text().length)
      .toEqual(93);
    expect(wrapper.find('ul li').length).toEqual(5);
    expect(wrapper.find('ul li span').at(0).text())
      .toEqual('Gilead02 borrowed by ');
    expect(wrapper.find('ul li span').at(1).text()).toEqual('ekundayo on ');
    expect(wrapper.find('ul li span').at(2).text().length).toEqual(29);
    expect(wrapper.find('ul li span').at(3).text().length).toEqual(40);
  });

  it('should have state with keys as tested below', () => {
    expect(wrapper.instance().state.showCategoryTitle).toEqual(false);
    expect(wrapper.instance().state.more).toEqual(10);
    expect(wrapper.instance().state.loadMore).toEqual(false);
    expect(wrapper.instance().state.numberOfPages).toEqual(2);
    expect(wrapper.instance().state).toHaveProperty('bookToEdit');
    expect(wrapper.instance().state).toHaveProperty('newBook');
    expect(wrapper.instance().state.wouldEdit).toEqual(false);
  });

  it('should render child components', () => {
    expect(wrapper.find('BookForm').exists()).toBe(true);
  });

  it(`should call filterBooksByCategory and fetchBooksByCategory to filter
     books by category`, () => {
      const shelfWrapper = wrapper.instance();
      const filterBooksByCategory =
        jest.spyOn(shelfWrapper, 'filterBooksByCategory');
      const event = {
        preventDefault: jest.fn()
      };
      shelfWrapper.filterBooksByCategory(1, event, 1);
      expect(filterBooksByCategory).toBeCalled();
      expect(props.fetchBooksByCategory).toBeCalled();
    });

  it('should call handleDelete to delete a book', () => {
    const shelfWrapper = wrapper.instance();
    const handleDelete =
      jest.spyOn(shelfWrapper, 'handleDelete');
    const event = {
      preventDefault: jest.fn()
    };
    shelfWrapper.handleDelete(1, event, 1);
    expect(handleDelete).toBeCalled();
  });

  it('should call handleEdit to edit a book', () => {
    const shelfWrapper = wrapper.instance();
    const handleEdit =
      jest.spyOn(shelfWrapper, 'handleEdit');
    shelfWrapper.handleEdit(books[1]);
    expect(handleEdit).toBeCalled();
  });

  it('should call handleMoreNotification for more notifications', () => {
    const shelfWrapper = wrapper.instance();
    const handleMoreNotification =
      jest.spyOn(shelfWrapper, 'handleMoreNotification');
    shelfWrapper.handleMoreNotification();
    expect(handleMoreNotification).toBeCalled();
    expect(props.fetchAllBorrowedBooks).toBeCalled();
  });

  it('should call handleSubmit when form is submitted', () => {
    const shelfWrapper = wrapper.instance();
    const handleSubmit =
      jest.spyOn(shelfWrapper, 'handleSubmit');
    const event = {
      preventDefault: jest.fn()
    };
    shelfWrapper.handleSubmit(event, 'newBook');
    expect(handleSubmit).toBeCalled();
  });

  it('should call handleChange when form is being filled', () => {
    const shelfWrapper = wrapper.instance();
    const handleChange =
      jest.spyOn(shelfWrapper, 'handleChange');
    const event = {
      target: {
        name: 'isbn',
        value: 235
      },
      preventDefault: jest.fn()
    };
    shelfWrapper.handleChange(event, 'bookToEdit');
    expect(handleChange).toBeCalled();
  });

  it('should call handleFileUpload when uploading book image', () => {
    const shelfWrapper = wrapper.instance();
    const handleFileUpload =
      jest.spyOn(shelfWrapper, 'handleFileUpload');
    const files = [
      'kavalier_and_clay.jpg',
      'gilead_01.jpg'
    ];
    shelfWrapper.handleFileUpload(files, book);
    expect(handleFileUpload).toBeCalled();
  });

  it('should render notes for categories and none for notifications', () => {
    expect(wrapper.find('.category-note').exists()).toBe(false);
    expect(wrapper.find('.notify-note').exists()).toBe(true);
    expect(wrapper.find('.notify-note').text())
      .toBe('Click below for more notifications');
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      booksReducer: {
        books
      },
      categoryReducer: {
        categories
      },
      borrowsReducer: {
        borrows
      }
    };
    expect(mapStateToProps(storeState).books).toHaveLength(4);
    expect(mapStateToProps(storeState).categories).toHaveLength(3);
  });
});
