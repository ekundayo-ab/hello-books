import axios from 'axios';

/**
 *
 * @param {*} data
 * @returns {string} // Decoded token
 */
const verifyToken = data =>
  axios.post('/api/v1/verify-token', data)
    .then((resp) => {
      const decoded = resp.data.decoded;
      localStorage.setItem('userDetails', JSON.stringify(decoded));
      return decoded;
    });

export default verifyToken;
