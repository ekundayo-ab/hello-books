import jwt from 'jsonwebtoken';

const token = localStorage.jwtToken;

export default jwt.verify(token, 'hello-books', (err, decoded) => {
  if (err) {
    return {
      verified: false,
      decoded: null,
    };
  }

  return {
    verified: true,
    decoded,
  };
});
