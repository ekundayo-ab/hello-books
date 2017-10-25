import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER, UNSET_CURRENT_USER } from '../actions/types';
import setAuthorizationHeader from '../utils/setAuthorizationToken';
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
        user = decoded.data;
      });
      localStorage.setItem('jwtToken', token);
      store.dispatch(setCurrentUser(user));
      setAuthorizationHeader(token);
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

function googleAuth(data) {
  const user = {
    token: data.tokenObj.access_token,
    username: data.w3.ig.split(' ')[0],
    email: data.w3.U3,
    role: 'normal',
    password: data.tokenObj.id_token,
    passwordConfirmation: data.tokenObj.id_token,
  };
  return axios.post('/api/v1/auth/google', user)
    .then((res) => {
      Materialize.toast(res.data.message, 4000, 'green');
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      store.dispatch(setCurrentUser(user));
      setAuthorizationHeader(token);
      return {
        success: res.data.success,
        message: res.data.message,
      };
    })
    .catch((err) => {
      Materialize.toast(err.response.data.message, 4000, 'red');
      return {
        success: err.response.data.success,
        message: err.response.data.message,
      };
    });
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
  setCurrentUser,
  userSignUpRequest,
  login,
  isUserExists,
  logout,
  googleAuth,
};
