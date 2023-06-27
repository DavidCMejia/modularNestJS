import { User } from 'src/users/entities/user.entity';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @ApiProperty()
  date: Date;
  user: User;
  products: Product[];
}
