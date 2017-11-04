import axios from 'axios';

const handleDrop = (files) => {
  // Push all the axios request promise into a single array
  const uploaders = files.map((file) => {
    // Initial FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'bdnqjpo9'); // Replace the preset name with your own
    formData.append('api_key', '135232672986957'); // Replace API key with your own Cloudinary key
    formData.append('timestamp', (Date.now() / 1000) | 0); // eslint-disable-line no-bitwise
    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    return axios.post('https://api.cloudinary.com/v1_1/dcl7tqhww/image/upload', formData, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      transformRequest: [(data, headers) => {
        delete headers.common['x-access-token']; // eslint-disable-line no-param-reassign
        return data;
      }],
    }).then((cloudinaryData) => {
      const imageUploaded = true;
      return {
        imageUploaded,
        data: cloudinaryData.data,
      };
    }).catch((err) => {
      const imageUploaded = false;
      return {
        imageUploaded,
        error: err.response.statusText,
      };
    });
  });
  return uploaders[0];
};

export {
  handleDrop,
};
