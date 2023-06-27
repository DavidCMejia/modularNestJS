import { ApiProperty } from '@nestjs/swagger';

export class Brand {
  @ApiProperty()
  id: number;
  name: string;
  image: string;
}
