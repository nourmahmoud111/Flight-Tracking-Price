import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { loginDto } from './dto/login.Dto';
import { RegisterDto } from './dto/register.Dto';
import { CurrentUser } from './decorators/current-user.decorator';
import type { jWTPayloadType } from 'src/utils/types';
import { AuthGuard } from './guards/auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/register')
  public Register(@Body() body: RegisterDto) {
    return this.usersService.Register(body);
  }

  @Post('auth/login')
  public Login(@Body() body: loginDto) {
    return this.usersService.Login(body);
  }


  @Get()
  @UseGuards(AuthGuard)
  public getAllUsers() {
    return this.usersService.getAll();
  }


  @Get('current-user')
  @UseGuards(AuthGuard)
  public getCurrentUser(@CurrentUser() payload:jWTPayloadType) {
    return this.usersService.getCurrentUser(payload.id) ;
  }


}
