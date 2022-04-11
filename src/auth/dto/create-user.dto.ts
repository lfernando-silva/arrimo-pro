import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @Length(1, 350)
  name: string;

  @ApiProperty()
  @Length(6, 350)
  email: string;

  @ApiProperty()
  @Length(1, 350)
  password: string;

  @ApiProperty()
  @Length(1, 350)
  confirm: string;
}
