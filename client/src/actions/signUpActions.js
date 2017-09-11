import axios from 'axios';

function userSignUpRequest(userData) {
  return ((dispatch) => {
    return axios.post('/api/v1/users/signup', userData);
  });
}

export default {
  userSignUpRequest,
};
