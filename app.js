import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swagger from 'swagger-jsdoc';
import socketIO from 'socket.io';
import router from './server/routes/';
import AuthMiddleware from './server/middlewares/AuthMiddleware';

const { authenticate, verifyToken } = AuthMiddleware;

require('dotenv').config();

const port = process.env.PORT || 8000;
const app = express();

// Set headers for Cross Origin Requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods',
    'POST, GET, OPTIONS, PUT, DELETE, HEAD');
  res.header('Access-Control-Allow-Headers',
    'Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Initialize swagger
const swaggerJSDoc = swagger;
// swagger definition
const swaggerDefinition = {
  info: {
    title: 'HelloBooks API',
    version: '1.0.0',
    description: 'An application that helps manage a library' +
    ' and its processes like stocking, tracking and renting of books.' +
    ' \n\n **NB: for Admin access use**' +
    '\n _username: `ekundayo`, \n password: `dayo`_' +
    '\n\n Image filenames are generated from cloudinary,' +
    ' the ones used in the sample models are just for sample purposes',
  },
  host: 'hellobooks-e.herokuapp.com',
  // host: 'localhost:8000', // This can be enabled for localhost
  basePath: '/api/v1',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/routes/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Log errors, server requests and responses
app.use(morgan('dev'));

// Parse requests and responses
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure static files for dist directory
app.use(express.static('./client/dist/'));

// Configure static files for public directory
app.use(express.static('./client/public/'));

// Serve directory with url as static files
app.use('/api/docs/', express.static(path.join(__dirname, 'server/api-docs/')));
app.post('/api/v1/verify-token', authenticate, verifyToken);
app.use('/api/v1', router);

// serve swagger
app.get('/api/docs/hellobooks.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Default catch all route for static files from build folder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/public/index.html'));
});

// Listens to port for requests
const server = app.listen(port, (err) => {
  /* eslint-disable no-console */
  if (err) console.log(err);
  console.log(`app started on port ${port} running in ${app.get('env')}`);
});

const io = socketIO(server);
io.on('connection', (socket) => {
  socket.on('borrow book', (data) => {
    io.emit('borrow book', data);
  });
  socket.on('return book', (data) => {
    io.emit('return book', data);
  });
});

export default app;
