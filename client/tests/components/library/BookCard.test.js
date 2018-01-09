import React from 'react';
import { shallow } from 'enzyme';
import createHistory from 'history/createMemoryHistory';
import BookCard
  from '../../../src/components/library/BookCard';
import {
  book,
} from '../../__mocks__/mockData';


const props = {
  location: { pathname: '/' },
  getBorrowedNotReturned: () => Promise.resolve(1),
  returnBook: () => Promise.resolve(1),
  book,
  history: createHistory()
};

const wrapper = shallow(
  <BookCard {...props} />
);
describe('BookCard Component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
