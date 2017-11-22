import axios from 'axios';
import store from '../../src/index';
import { setCurrentUser } from '../actions/authActions';


const autoUpgrade = () =>
  axios.post('/api/v1/users/autoupgrade')
    .then((res) => {
      if (res.data.success) {
        store.dispatch(setCurrentUser(res.data.user));
        Materialize.toast(res.data.message, 3000, 'green');
      }
    })
    .catch(err => err.response.data);

export default autoUpgrade;
