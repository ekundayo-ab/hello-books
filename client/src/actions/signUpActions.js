import axios from 'axios';

function userSignUpRequest(userData) {
  return () => axios.post('/api/v1/users/signup', userData);
}

function isUserExists(userData) {
  return () => axios.post('/api/v1/users', userData);
}

export {
  userSignUpRequest,
  isUserExists,
};
