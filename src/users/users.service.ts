import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { LoginDto } from 'src/auth/dto/login.dto';
import { v4 as uuid4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    // return this.usersRepository.save(createUserDto);
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.apiKey = uuid4();

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(createUserDto.password, salt);

    const savedUser = await this.usersRepository.save(user);
    delete savedUser.password;
    return savedUser;
  }

  async findOne(loginDto: LoginDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      email: loginDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }
  async updateSecretKey(userId, secret: string): Promise<UpdateResult> {
    return this.usersRepository.update(
      { id: userId },
      {
        twoFASecret: secret,
        enable2FA: true,
      },
    );
  }
  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.usersRepository.update(
      { id: userId },
      {
        enable2FA: false,
        twoFASecret: null,
      },
    );
  }
  async findByApiKey(apiKey: string): Promise<User> {
    return this.usersRepository.findOneBy({ apiKey });
  }
}
