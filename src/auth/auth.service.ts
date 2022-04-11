import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities';
import { UserRepository } from './repositories';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';

@Injectable()
export class AuthService {
  private userRepository: UserRepository;
  private jwtService: JwtService;
  constructor(private readonly connection: Connection) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.confirm) {
      throw new UnprocessableEntityException(
        'Password and confirmation are differents',
      );
    }
    return this.userRepository.create(createUserDto);
  }

  async signIn(loginDto: LoginUserDto) {
    const user = await this.userRepository.checkCredentials(loginDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = this.jwtService.sign(jwtPayload);

    return { token };
  }
}
