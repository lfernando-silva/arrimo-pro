import bcrypt from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

const salt = 10;

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, salt);
    return hash === this.password;
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, salt);
  }
}
