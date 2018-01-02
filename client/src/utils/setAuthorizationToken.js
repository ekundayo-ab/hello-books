import axios from 'axios';

/**
 * @description Sets the authorization token
 *
 * @param {string} token - token gotten from local storage
 *
 * @returns {null} nothing - Returns nothing
 */
const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

export default setAuthorizationToken;
