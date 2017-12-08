import axios from 'axios';
import { setCurrentUser } from '../actions/authActions';
import autoUpgrade from '../utils/autoUpgrade';

/**
 *
 * @param {*} data
 * @returns {string} // Decoded token
 */
const verifyToken = data =>
  dispatch =>
    axios.post('/api/v1/verify-token', data)
      .then((res) => {
        const { decoded } = res.data;
        autoUpgrade();
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
