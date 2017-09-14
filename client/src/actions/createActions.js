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
        console.log(err);
      });
  });
}

function saveBook(data) {
  return ((dispatch) => {
    axios.post('/api/v1/books', data, { 'x-access-token': token });
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  });
}

export {
  fetchBooks,
  setBooks,
  saveBook,
  SET_BOOKS,
};
