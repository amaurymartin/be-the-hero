// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database: 'omnistack_11',
      user:     'amaurymartin',
      password: 'amaurymartin',
      charset: 'utf-8'
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'omnistack_11',
      user:     'amaurymartin',
      password: 'amaurymartin'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'db_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'omnistack_11',
      user:     'amaurymartin',
      password: 'amaurymartin'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'db_migrations'
    }
  }

};