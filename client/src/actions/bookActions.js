import axios from 'axios';

const SET_BOOKS = 'SET_BOOKS';
const token = localStorage.getItem('jwtToken');

function setBooks(books) {
  return {
    type: SET_BOOKS,
    books,
  };
}

function fetchBooks() {
  return ((dispatch) => {
    axios.get('/api/v1/books', { 'x-access-token': token })
      .then((res) => {
        dispatch(setBooks(res.data));
      })
      .catch((err) => {
        console.log('I am the function');
      });
  });
}

function saveBook(data) {
  return ((dispatch) => {
    axios.post('/api/v1/books', data, { 'x-access-token': token })
      .then((res) => {
        const response = { res: res.response.data, isDone: true };
        return response;
      })
      .catch((err) => {
        const errors = err.response;
        return { errors, loading: false };
      });
  });
}

export {
  fetchBooks,
  setBooks,
  saveBook,
  SET_BOOKS,
};
