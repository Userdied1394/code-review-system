const { Pool } = require('pg');

const pool = new Pool({
  user: 'HAD428',
  host: 'localhost',
  database: 'mongodb,
  password: 'hema1394',
  port: 5432,
});

module.exports = pool;
