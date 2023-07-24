import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';

import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BasicEntity } from '../../database/basic.entity';

@Entity()
export class Customer extends BasicEntity {
  @ApiProperty()
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;
}
