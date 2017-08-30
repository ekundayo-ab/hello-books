require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_USER,
    password: process.env.DEV_PASS,
    database: process.env.DEV_DB,
    host: process.env.DEV_HOST,
    dialect: 'postgres',
  },
  test: {
    username: 'ekundayo',
    password: 'ekundayo',
    database: 'testdb',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
  },
};
