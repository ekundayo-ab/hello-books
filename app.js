import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './server/routes/';

require('dotenv').config();

const port = process.env.PORT || 8000;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', router);

app.get('*', (req, res) => {
  res.status(404).send('Ooops, and that was surprising, you might want to come in at /api/v1. See you!');
});

app.listen(port, (err) => {
  /* eslint-disable no-console */
  if (err) console.log(err);
  console.log('started');
  console.log(process.env.USER_DEV);
  console.log(process.env.PASS_DEV);
  console.log(process.env.HOST_DEV);
  console.log(process.env.DB_DEV);
});

export default app;
