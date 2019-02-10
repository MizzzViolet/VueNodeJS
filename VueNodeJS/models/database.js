const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/postgres';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
    `CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(10) not null,
      image VARCHAR not null,
      score INTEGER
    )`
    );
query.on('end', () => { client.end(); });