import axios from 'axios';
import { setCurrentUser } from '../actions/authActions';

/**
   * Auto Upgrade
   *
   * @description Ensures a user is automatically upgraded when certain
   * conditions are met
   *
   * @returns {object} user - Payload of user to upgrade
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
