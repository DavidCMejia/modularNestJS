import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from '../../database/basic.entity';
import { Product } from './product.entity';

@Entity()
export class Category extends BasicEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
