import axios from 'axios';
import { SET_CURRENT_USER, UNSET_CURRENT_USER, SET_EXISTENCE }
  from '../actions/types';
import setAuthorizationHeader from '../utils/setAuthorizationToken';

/**
 * Set Current User
 *
 * @description Set the current user
 *
 * @param {object} user - user to set
 *
 * @returns {object} action
 */
const setCurrentUser = user =>
  ({ type: SET_CURRENT_USER, user });

/**
 * Unset Current User
 *
 * @description Unset the current user
 *
 * @param {object} user - user to unset
 *
 * @returns {object} action
 */
const unsetCurrentUser = user =>
  ({ type: UNSET_CURRENT_USER, user, });

/**
 * Unset Current User
 *
 * @description Sets message if user exists or not
 *
 * @param {object} message - message to set
 *
 * @returns {object} action
 */
export const setUserExists = message =>
  ({ type: SET_EXISTENCE, message, });

/**
 * Log in User
 *
 * @description Sign in user to the library
 *
 * @param {object} userData - user details
 *
 * @returns {object} action
 */
const login = userData =>
  dispatch => axios.post('/api/v1/users/signin', userData)
    .then((res) => {
      const { token, user, message } = res.data;
      localStorage.setItem('jwtToken', token);
      dispatch(setCurrentUser(user));
      setAuthorizationHeader(token);
      return {
        isAuthenticated: true,
        message,
      };
    })
    .catch((err) => {
      const { message } = err.response.data;
      Materialize.toast(message, 2000, 'red');
      return { isAuthenticated: false, message };
    });

/**
 * Register and Logs in User with Google
 *
 * @description Gets user details from google,
 * then signs in the user with the detail gotten
 *
 * @param {object} userData - user details
 *
 * @returns {object} action
 */
const googleAuth = (userData) => {
  const user = {
    token: userData.tokenObj.access_token,
    username: userData.w3.ig.split(' ')[0],
    email: userData.w3.U3,
    role: 'normal',
    password: userData.tokenObj.id_token,
    passwordConfirmation: userData.tokenObj.id_token,
  };
  return dispatch => axios.post('/api/v1/auth/google', user)
    .then((res) => {
      const { token, message } = res.data;
      Materialize.toast(message, 2000, 'green');
      localStorage.setItem('jwtToken', token);
      dispatch(setCurrentUser(user));
      setAuthorizationHeader(token);
      return {
        success: true,
        message,
      };
    })
    .catch((err) => {
      const { message } = err.response.data;
      Materialize.toast(message, 2000, 'red');
      return { success: false, message };
    });
};

/**
 * Logout User
 *
 * @description Signs out user from the library
 *
 * @param {void} none - takes no argument
 *
 * @returns {object} action
 */
const logout = () => (dispatch) => {
  const user = {};
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userDetails');
  return dispatch(unsetCurrentUser(user));
};

/**
 * Registers User
 *
 * @description Gets user details by registering them
 *
 * @param {object} userData - user details
 *
 * @returns {object} action
 */
const userSignUpRequest = userData =>
  dispatch =>
    axios.post('/api/v1/users/signup', userData)
      .then((res) => {
        const { message } = res.data;
        const { username, password } = userData;
        const loginDetails = { identifier: username, password };
        return dispatch(login(loginDetails)).then((res) => {
          Materialize.toast(`${message} You're logged in`, 3000, 'green');
          return { isDone: res.isAuthenticated, message };
        });
      })
      .catch((err) => {
        Materialize.toast(err.response.data.message, 2000, 'red');
        return err.response.data;
      });


/**
 * Check User existence
 *
 * @description Checks if a users exists in the library
 *
 * @param {object} userData - user details
 *
 * @returns {object} action
 */
const doesUserExist = userData =>
  dispatch =>
    axios.post('/api/v1/users', userData)
      .then((res) => {
        const { exists } = res.data;
        const toDispatch = exists ? 'User exists' : 'Available cleared!';
        dispatch(setUserExists(toDispatch));
        return res.data;
      })
      .catch((err) => {
        Materialize.toast(err.response.data.message, 2000, 'red');
        return err.response.data;
      });

/**
 * Check User existence
 *
 * @description Checks if a users exists in the library
 *
 * @param {object} passwordData - user details
 *
 * @returns {object} action
 */
const changePassword = passwordData =>
  axios.post('/api/v1/users/pass', passwordData)
    .then((res) => {
      Materialize.toast(res.data.message, 2000, 'green');
      return res.data;
    })
    .catch((err) => {
      Materialize.toast(err.response.data.message, 2000, 'red');
      return err.response.data;
    });

export {
  setCurrentUser,
  userSignUpRequest,
  login,
  doesUserExist,
  logout,
  googleAuth,
  changePassword
};
