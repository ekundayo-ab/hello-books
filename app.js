import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './server/routes/';

const port = process.env.PORT || 8000;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.listen(port, (err) => {
  /* eslint-disable no-console */
  if (err) console.log(err);
  console.log('started');
});

export default app;
