import axios from 'axios';

const verifyToken = (data) => {
  return axios.post('/api/v1/verify-token', data)
    .then((resp) => {
      const decoded = resp.data.decoded;
      return decoded;
    });
};

export default verifyToken;
