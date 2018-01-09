import setAuthorizationToken from '../../src/utils/setAuthorizationToken';

describe('Authentication actions', () => {
  describe('setAuthorization utility function', () => {
    it('should delete token from axios headers if not exist', (done) => {
      setAuthorizationToken();
      done();
    });

    it('should set token as axios headers if it exists', (done) => {
      const token = 'fakeTokenValue';
      setAuthorizationToken(token);
      done();
    });
  });
});

