import axios from 'axios';

function authActions(data) {
  return () => axios.post('/api/v1/users/signin', data);
}

export default authActions;
