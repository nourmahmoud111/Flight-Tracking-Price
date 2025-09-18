import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  providers: [UsersService], 
   imports: [
    TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject:[ConfigService],
    useFactory:(config:ConfigService) =>{
   return {  
      global: true, // makes JwtService available everywhere in your app
      secret: config.get<string>("JWT_SECRET"), // the key used to sign & verify tokens
      signOptions: { expiresIn: config.get<string>("JWT_SECRET_IN") }} // token expiry
        }})
      ]
})
export class UsersModule {}
