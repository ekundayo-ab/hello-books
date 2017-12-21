import axios from 'axios';
import { setCurrentUser } from '../actions/authActions';

/**
 *
 * @param {object} userDetails
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
        return { isDone: true };
      })
      .catch(() => {
        Materialize.toast(
          'Oops! Something happened, Allow us verify you again',
          3000, 'red');
        return { isDone: false };
      });

export default verifyToken;
