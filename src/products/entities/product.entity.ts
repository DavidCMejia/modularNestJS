import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty()
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}
