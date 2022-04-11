import { EntityRepository, Repository } from 'typeorm';
import { LoginUserDto } from '../dto/login-user.dto';
import { User } from '../entities';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  async checkCredentials(loginDto: LoginUserDto): Promise<User> {
    const { email, password } = loginDto;
    const user = await this.findOne({ email });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
