import axios from 'axios';
import { SET_CURRENT_USER } from '../actions/types';

function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

/*
const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(decoded));
*/

function login(data) {
  return () => axios.post('/api/v1/users/signin', data);
}

function userSignUpRequest(userData) {
  return () => axios.post('/api/v1/users/signup', userData);
}

function isUserExists(userData) {
  return () => axios.post('/api/v1/users', userData);
}

export {
  userSignUpRequest,
  login,
  isUserExists,
  setCurrentUser,
};
