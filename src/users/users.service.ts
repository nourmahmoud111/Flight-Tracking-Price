import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register.Dto';
import { loginDto } from './dto/login.Dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'node_modules/bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { jWTPayloadType } from 'src/utils/types';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private readonly _usersRepository:Repository<User>,
  private readonly _jwtservice:JwtService,
){}


  public async Register( RegisterDto: RegisterDto) {
    const {name,email,password} = RegisterDto
    const userFromDb =await this._usersRepository.findOne({where:{email}})
    if(userFromDb) throw new BadRequestException("user already exist")

      const hashedpassword = await this.hashPassword(password)

    let newUser =this._usersRepository.create({
      name,
      email,
      password:hashedpassword,
    })
    newUser =await this._usersRepository.save(newUser)
    const payload: jWTPayloadType = { id: newUser.id };
    const token = await this.generateJWT(payload);
    return { message:"success",newUser, token};
  }




  public async Login( loginDto: loginDto) {
    const {email,password} = loginDto
    const user = await this._usersRepository.findOne({where:{email}})
    if(!user) throw new BadRequestException("invalid email")

    const isPassword= await bcrypt.compareSync(password, user.password)
    if(!isPassword) throw new BadRequestException("invalid password")

    const payload: jWTPayloadType = { id: user.id };
    const token = await this.generateJWT(payload);

    return{token}


  }


  public getAll() :Promise<User[]> {
    return this._usersRepository.find();
  }



  public async getCurrentUser(id :number):Promise<User>{
    const user = await this._usersRepository.findOne({where:{id}})
    if(!user) throw new NotFoundException("user not found")
    return user
    }






    //hashPassword
    public async hashPassword(password:string): Promise<string>{
     const salt= await bcrypt.genSalt(10)
        return bcrypt.hash(password,salt)
    }


    //generate jwt
    private generateJWT(payload:jWTPayloadType) :Promise<string>{
       return this._jwtservice.signAsync(payload)
    }



}
