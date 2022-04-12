import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from './repositories';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';

@Injectable()
export class AuthService {
  private userRepository: UserRepository;
  constructor(
    private readonly connection: Connection,
    private jwtService: JwtService,
  ) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  async signUp(createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.confirm) {
      throw new UnprocessableEntityException(
        'Password and confirmation are differents',
      );
    }
    return this.userRepository.createUser(createUserDto);
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
