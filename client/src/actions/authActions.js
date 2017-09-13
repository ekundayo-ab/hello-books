import axios from 'axios';
import { SET_CURRENT_USER } from '../actions/types';
import { setAuthorizationToken } from '../utils/setAuthorizationToken';
import verifyToken from './../utils/verifyAuthorizationToken';

const { decoded } = verifyToken;

function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

function login(data) {
  return (dispatch) => { // eslint-disable-line arrow-body-style
    return axios.post('/api/v1/users/signin', data).then((res) => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(decoded));
    });
  };
}

export {
  login,
  setCurrentUser,
};
