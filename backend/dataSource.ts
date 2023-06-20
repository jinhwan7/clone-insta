import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_NAME + '_' + process.env.NODE_ENV,
  synchronize: false,
  logging: true,
  // namingStrateg: new SnakeNamingStrategy(),
  migrations: ['migrations/**/*.ts'],
});

export default dataSource;
