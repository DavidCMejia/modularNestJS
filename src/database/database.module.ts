import { ConfigType } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';
import config from '../config';

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
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port,
        });
        console.log('🚀 ~ client:', client);
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['DB_CONNECTION', 'PG'],
})
export class DatabaseModule {}
