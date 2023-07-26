import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BasicEntity } from '../../database/basic.entity';
import { Product } from './product.entity';

@Entity()
export class Brand extends BasicEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
