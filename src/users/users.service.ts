import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register.Dto';
import { loginDto } from './dto/login.Dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'node_modules/bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { jWTPayloadType } from 'src/utils/types';
import { AuthProvider } from './auth.provider';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private readonly _usersRepository:Repository<User>,
  private readonly _authProvider:AuthProvider,

){}


  public async Register( RegisterDto: RegisterDto) {
    return this._authProvider.Register(RegisterDto)
  }


  public async Login( loginDto: loginDto) {
    return this._authProvider.Login(loginDto)
  }




  public getAll() :Promise<User[]> {
    return this._usersRepository.find();
  }



  public async getCurrentUser(id :number):Promise<User>{
    const user = await this._usersRepository.findOne({where:{id}})
    if(!user) throw new NotFoundException("user not found")
    return user
    }







}
