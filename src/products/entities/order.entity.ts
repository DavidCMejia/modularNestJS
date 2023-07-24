import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../entity/User';
@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'varchar', length: 255 })
  user: User;

  @Column({ type: 'varchar', length: 255 })
  products: Product[];
}
