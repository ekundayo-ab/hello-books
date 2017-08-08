import http from 'http';
import app from '../app';
import models from '../server/models/index';

const api = app(models);

http.createServer(api).listen(3000, () => {
  console.log('starting server on port 3000');
});

