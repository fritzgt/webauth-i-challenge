module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      //update to location and db name
      filename: './database/auth.sqlite3'
    },
    //add useNullAsDefault
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};
