import axios from 'axios';

function userSignUpRequest(userData) {
  return dispatch => axios.post('/api/v1/users/signup', userData);
}

function isUserExists(userData) {
  return dispatch => axios.post('/api/v1/users', userData);
}

export {
  userSignUpRequest,
  isUserExists,
};
