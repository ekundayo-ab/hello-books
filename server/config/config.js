export default {
  development: {
    username: 'ekundayo',
    password: 'ekundayo',
    database: 'hello-books',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'ekundayo',
    password: 'ekundayo',
    database: 'hello-books-test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};
