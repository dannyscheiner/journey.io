const {Pool} = require('pg');

const PG_URL = 'postgres://iuzmrnll:zCk0xMO54MPNFKBZxTuUoUdo5OonVbag@rajje.db.elephantsql.com:5432/iuzmrnll';

const pool = new Pool({
    connectionString: PG_URL
});

//TABLE USERS
// CREATE TABLE USERS(
// _id SERIAL PRIMARY KEY NOT NULL,
// username VARCHAR UNIQUE NOT NULL,
// pw VARCHAR NOT NULL,
// cookie SMALLINT NOT NULL,
// );

//TABLE TASKS
// CREATE TABLE TASKS(
// _id SERIAL PRIMARY KEY NOT NULL,
// task VARCHAR NOT NULL,
// deadline DATE,
// completed BOOLEAN,
// completed_date DATE,
// user_id INT REFERENCES USERS(_id)
// );

module.exports = {
    query: (text, params, cb) => {
      console.log('executed query', text);
      return pool.query(text, params, cb);
    }
}
