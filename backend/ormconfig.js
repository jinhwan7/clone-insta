require('dotenv/config');
// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  autoLoadEntities: true,
  keepConnectionAlive: true,
  logging: true,
  // namingStrateg: new SnakeNamingStrategy(),
  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/**/*.ts'],
  cli: { migrationsDir: 'migrations' },
  seeds: ['src/seeds/**/*.ts'],
};
