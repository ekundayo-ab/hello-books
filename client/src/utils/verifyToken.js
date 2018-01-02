import axios from 'axios';
import { setCurrentUser } from '../actions/authActions';

/**
 * @description Verifies an authorization token
 *
 * @param {object} userDetails - Payload of the user to be verified
 *
 * @returns {string} - Decoded token
 */
const verifyToken = userDetails =>
  dispatch =>
    axios.post('/api/v1/verify-token', userDetails)
      .then((res) => {
        const { decoded } = res.data;
        dispatch(setCurrentUser(res.data.user));
        localStorage.setItem('userDetails', JSON.stringify(decoded));
        return decoded;
      })
      .catch(() => false);

export default verifyToken;
