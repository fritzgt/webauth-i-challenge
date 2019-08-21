module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      //update to location and db name
      filename: './auth.sqlite3'
    },
    //add useNullAsDefault
    useNullAsDefault: true,
    //for cascading foreign keys
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      }
    }
  }
};
