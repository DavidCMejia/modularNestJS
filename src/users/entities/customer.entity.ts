import { ApiProperty } from '@nestjs/swagger';

export class Customer {
  @ApiProperty()
  id: number;
  name: string;
  lastName: string;
  phone: string;
}
