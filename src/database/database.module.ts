import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';

const DB = 'postgres';
const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123456',
  port: 5438,
});

client.connect();
// client.query('SELECT * FROM tasks', (err, res) => {
//   console.error(err);
//   console.log(res.rows);
// });

@Global()
@Module({
  providers: [
    {
      provide: 'DB_CONNECTION',
      useValue: DB,
    },
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['DB_CONNECTION', 'PG'],
})
export class DatabaseModule {}
