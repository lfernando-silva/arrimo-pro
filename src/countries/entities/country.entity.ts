import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Subscription } from 'src/subscriptions/entities';

@Entity('countries')
export default class Country {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  code: string;

  @Column()
  @ApiProperty()
  name: string;

  @OneToMany(() => Subscription, (subscription) => subscription.country)
  @ApiProperty()
  subscribers: Subscription[];
}
