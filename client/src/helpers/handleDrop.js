import axios from 'axios';

/**
 * Book Cover Upload
 *
 * @description Upload book cover image to cloudinary
 *
 * @param {array} files - array of files to upload
 *
 * @returns {string} Image URL
 */
const handleDrop = (files) => {
  // Push all the axios request promise into a single array
  const uploaders = files.map((file) => {
    // Initial FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.UPLOAD_PRESET);
    formData.append('api_key', process.env.API_KEY);
    formData.append('timestamp',
      (Date.now() / 1000) | 0); // eslint-disable-line no-bitwise
    return axios.post('https://api.cloudinary.com/v1_1/dcl7tqhww/image/upload',
      formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        transformRequest: [(data, headers) => {
          delete headers.common['x-access-token'];
          return data;
        }],
      })
      .then((cloudinaryData) => {
        const imageUploaded = true;
        return {
          imageUploaded,
          data: cloudinaryData.data,
        };
      }).catch(() => {
        const imageUploaded = false;
        return {
          imageUploaded,
          error: 'Oops! something happened try again',
        };
      });
  });
  return uploaders[0];
};

export default handleDrop;
