import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Country } from 'src/countries/entities';
import Frequency from 'src/@types/frequency';

@Entity('subscriptions')
export default class Subcription {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({
    name: 'subscription_name',
    type: 'timestamptz',
    default: new Date(),
  })
  subscriptionTime: Date;

  @Column({ name: 'is_email_verified', type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column({ name: 'subscriber_name' })
  @ApiProperty()
  subscriberName: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column({
    name: 'frequency',
    type: 'enum',
    enum: ['daily', 'weekly', 'monthly'],
    default: 'weekly',
  })
  @ApiProperty()
  frequency: Frequency;

  @ApiProperty()
  @ManyToOne(() => Country, (country) => country.subscribers)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
