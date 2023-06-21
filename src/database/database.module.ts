import { Global, Module } from '@nestjs/common';

const DB = 'postgres';

@Global()
@Module({
  providers: [
    {
      provide: 'DB_CONNECTION',
      useValue: DB,
    },
  ],
  exports: ['DB_CONNECTION'],
})
export class DatabaseModule {}
