import axios from 'axios';

/**
 *
 * @param {*} data
 * @returns {string} // Decoded token
 */
const verifyToken = data =>
  axios.post('/api/v1/verify-token', data)
    .then((resp) => {
      const { decoded, user } = resp.data;
      localStorage.setItem('userDetails', JSON.stringify(decoded));
      return { decoded, user };
    });

export default verifyToken;
