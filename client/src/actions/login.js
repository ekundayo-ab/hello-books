import axios from 'axios';

function login(data) {
  return () => axios.post('/api/v1/users/signin', data);
}

export default login;
