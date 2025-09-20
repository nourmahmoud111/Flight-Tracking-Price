import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.Dto";
import { BadRequestException } from "@nestjs/common";
import { jWTPayloadType } from "src/utils/types";
import { loginDto } from "./dto/login.Dto";
import * as bcrypt from 'bcrypt';


export class AuthProvider {
    constructor(
        @InjectRepository(User)
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
    return { message:"success",newUser};
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