// Update with your config settings.

const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
}

module.exports = {

  development: {
    ...sharedConfig,
    connection: {
      filename: './dev.sqlite3'
    }
  },
};
