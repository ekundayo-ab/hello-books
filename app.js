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
  res.status(404).send('Ooops, Route not found, Come in at /api/v1.');
});


app.listen(port, (err) => {
  /* eslint-disable no-console */
  if (err) console.log(err);
  console.log(`app started on port ${port} running in ${app.get('env')}`);
});

export default app;
