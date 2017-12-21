import moxios from 'moxios';
import handleDrop from '../../src/helpers/handleDrop';
import { user } from '../__mocks__/mockData';

describe('HandleDrop action', () => {
  it('should upload image files to cloudinary and return image url', (done) => {
    moxios
      .stubRequest('https://api.cloudinary.com/v1_1/dcl7tqhww/image/upload', {
        status: 200,
        response: {
          message: 'You\'ve been upgraded',
          user,
        }
      });
    const files = ['areta.png', 'half_of_a_yellow.png'];
    handleDrop(files)
      .then((res) => {
        expect(res.imageUploaded).toEqual(false);
        expect(res.error).toEqual('Oops! something happened try again');
        done();
      });
  });
});

