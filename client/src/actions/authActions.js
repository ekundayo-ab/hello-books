import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER, UNSET_CURRENT_USER } from '../actions/types';
import store from '../../src/index';


function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

function unsetCurrentUser(user) {
  return {
    type: UNSET_CURRENT_USER,
    user,
  };
}

function login(data) {
  return axios.post('/api/v1/users/signin', data)
    .then((res) => {
      let user;
      const token = res.data.token;
      jwt.verify(token, 'hello-books', (err, decoded) => {
        user = decoded;
      });
      localStorage.setItem('jwtToken', token);
      store.dispatch(setCurrentUser(user));
      return {
        isAuthenticated: true,
        message: res.data.message,
      };
    })
    .catch(err =>
      ({
        isAuthenticated: false,
        message: err.response.data.message,
      }),
    );
}

function logout() {
  const user = {};
  store.dispatch(unsetCurrentUser(user));
  localStorage.removeItem('jwtToken');
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
  logout,
};
