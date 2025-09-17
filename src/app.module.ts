import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { FlightsModule } from './flights/flights.module';
import { User } from './users/entities/user.entity';
import { FlightRequest } from './flights/entities/flightrequest.entity';
import { FlightPrice } from './flights/entities/flightprice.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
UsersModule,
FlightsModule,
ConfigModule.forRoot({
  isGlobal:true,
  envFilePath:".env"
}),
TypeOrmModule.forRootAsync({
    inject :[ConfigService],
    useFactory:(config:ConfigService) =>{
      return{
        type: "postgres",
        database: config.get<string>("DB_DATABASE"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
     port: config.get<number>("DB_PORT"),
     host: "localhost",
     synchronize: process.env.NODE_ENV !== "production",  
     entities: [User,FlightRequest,FlightPrice],                   
     
    }
  }
}),
],
controllers: [AppController],
  providers: [AppService,{provide:APP_INTERCEPTOR,useClass:ClassSerializerInterceptor}],
})
export class AppModule {}
