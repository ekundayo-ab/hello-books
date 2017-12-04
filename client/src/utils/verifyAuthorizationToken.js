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
        const composableUser = {
          id: res.data.user.id,
          username: res.data.user.username,
          role: res.data.user.role,
          level: res.data.user.level,
          borrowLimit: res.data.user.borrowLimit,
          totalBorrow: res.data.user.totalBorrow
        };
        dispatch(setCurrentUser(composableUser));
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
