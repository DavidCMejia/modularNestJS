import { Module } from '@nestjs/common';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

const API_KEY = '12345634';
@Module({
  imports: [
    UsersModule,
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        // DATABASE_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // como AppService tiene por defecto el useClass con el scope de singleton, no hay necesidad de {}
    // pero para el apiKey, como no tiene scope, hay que ponerlo
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
  ],
})
export class AppModule {}
