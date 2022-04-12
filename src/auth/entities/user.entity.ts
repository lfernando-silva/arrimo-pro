import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

const salt = 10;

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.compare(password, this.password);
    return hash;
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, salt);
  }
}
