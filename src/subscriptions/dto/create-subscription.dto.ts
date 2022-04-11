import { ApiProperty } from '@nestjs/swagger';
import { Length, IsUUID, IsIn } from 'class-validator';
import Frequency from '../../@types/frequency';

export class CreateSubscriptionDto {
  @ApiProperty()
  @Length(6, 350)
  email: string;

  @ApiProperty()
  @Length(1, 350)
  subscriberName: string;

  @ApiProperty()
  @IsIn(['weekly', 'monthly', 'daily'])
  frequency: Frequency;

  @ApiProperty()
  @IsUUID()
  countryId: string;
}
