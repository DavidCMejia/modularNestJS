import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

const API_KEY = '12345634';
@Module({
  imports: [UsersModule, ProductsModule, DatabaseModule],
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
