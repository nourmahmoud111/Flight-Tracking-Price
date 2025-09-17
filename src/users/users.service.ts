import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from './dto/register.Dto';
import { loginDto } from './dto/login.Dto';

@Injectable()
export class UsersService {


  Register( RegisterDto: RegisterDto) {
    return 'This action adds a new user';
  }
  Login( loginDto: loginDto) {
    return 'This action login user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
