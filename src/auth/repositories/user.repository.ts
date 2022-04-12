import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { User } from '../entities';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  async createUser({ email, password, name }: CreateUserDto) {
    const user = this.create();
    user.email = email;
    user.name = name;
    user.password = await user.hashPassword(password);
    await this.save(user);

    delete user.password;
    return user;
  }

  async checkCredentials(loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    const user = await this.findOne({ email });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
