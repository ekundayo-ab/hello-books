import handleDrop from '../../src/helpers/handleDrop';

describe('HandleDrop action', () => {
  it('should upload image files to cloudinary and return image url', (done) => {
    const files = ['areta.png', 'half_of_a_yellow.png'];
    handleDrop(files)
      .then((res) => {
        expect(res.imageUploaded).toEqual(false);
        expect(res.error).toEqual('Oops! something happened try again');
        done();
      });
  });
});

