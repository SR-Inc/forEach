const { Pool } = require('pg');
const env = require('dotenv').config();

// PG_URI = 'postgres://ippipklo:ub0WupWyDy9gKdQp1xKmiXOd-Uodug3c@ziggy.db.elephantsql.com:5432/ippipklo'
// const connectionString = PG_URI;

const connectionString = process.env.PG_URI;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString,
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};