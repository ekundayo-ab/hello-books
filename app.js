import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swagger from 'swagger-jsdoc';
import router from './server/routes/';
import authMiddleware from './server/middlewares/auth';

require('dotenv').config();

const port = process.env.PORT || 8000;
const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE, HEAD');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept');
  next();
});
const swaggerJSDoc = swagger;
// swagger definition
const swaggerDefinition = {
  info: {
    title: 'HelloBooks API',
    version: '1.0.0',
    description: 'An application that helps manage a library and its processes like stocking, tracking and renting of books.',
  },
  host: 'hellobooks-e.herokuapp.com',
  // host: 'localhost:8000',
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

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/docs/', express.static(path.join(__dirname, 'server/api-docs/')));
app.post('/api/v1/verify-token', authMiddleware.authenticate, authMiddleware.verifyToken);
app.use('/api/v1', router);

// serve swagger
app.get('/api/docs/hellobooks.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Default catch all route non available guest routes
app.get('*', (req, res) => {
  res.status(404).send('Ooops, Route not found, Come in at /api/v1.');
});


app.listen(port, (err) => {
  /* eslint-disable no-console */
  if (err) console.log(err);
  console.log(`app started on port ${port} running in ${app.get('env')}`);
});

export default app;
