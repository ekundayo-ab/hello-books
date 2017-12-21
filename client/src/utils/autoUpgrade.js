import axios from 'axios';
import { setCurrentUser } from '../actions/authActions';

/**
   * Validates Email
   *
   * @description Ensures email supplied is a valid email address
   *
   * @returns {boolean} true or false
   */
const autoUpgrade = () =>
  dispatch =>
    axios.post('/api/v1/users/autoupgrade')
      .then((res) => {
        if (res.data.user) {
          dispatch(setCurrentUser(res.data.user));
          Materialize.toast(res.data.message, 3000, 'green');
        }
      }).catch(err => err.response.data);

export default autoUpgrade;
