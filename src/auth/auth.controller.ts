import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import * as bycrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from './jwt-guard';
import { Enable2FAType } from './types';
import { ValidateTokenDTO } from './dto/validate-token.dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  
  @Post('signup')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'It will return the user in repsone',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const salt = await bycrypt.genSalt();
    createUserDto.password = await bycrypt.hash(createUserDto.password, salt);
    const user = await this.usersService.createUser(createUserDto);
    delete user.password;
    return user;
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'It will give you the access_token in the response',
  })
  login(
    @Body() loginDto: LoginDto,
  ): Promise<
    { accessToken: string } | { validate2FA: string; message: string }
  > {
    return this.authService.login(loginDto);
  }

  // @Get('profile')
  // @UseGuards(JwtAuthGuard)
  // getProfile(
  //   @Request()
  //   request: {
  //     user: any;
  //   },
  // ) {
  //   return request.user;
  // }

  @Get('enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2FA(
    @Request()
    req,
  ): Promise<Enable2FAType> {
    console.log(req.user);
    return this.authService.enable2FA(req.user.userId);
  }

  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  validate2FA(
    @Request()
    req,
    @Body()
    ValidateTokenDTO: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      ValidateTokenDTO.token,
    );
  }
  @Get('disable-2fa')
  @UseGuards(JwtAuthGuard)
  disable2FA(
    @Request()
    req,
  ): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }
    
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  getProfile(
    @Request()
    req,
  ) {
    delete req.user.password;
    return {
      msg: 'authenticated with api key',
      user: req.user,
    };
  }

  @Get('test')
  testEnvVariable() {
    return this.authService.getEnvVariable();
  }
}
