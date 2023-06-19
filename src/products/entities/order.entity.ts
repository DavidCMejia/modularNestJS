import { User } from 'src/users/entities/user.entity';
import { Product } from './product.entity';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
