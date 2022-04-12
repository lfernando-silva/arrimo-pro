import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @Length(1, 350)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(1, 2)
  password: string;

  @ApiProperty()
  @Length(1, 350)
  confirm: string;
}
