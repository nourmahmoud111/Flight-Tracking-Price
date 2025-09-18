import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightRequest } from './entities/flightrequest.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { FlightPrice } from './entities/flightprice.entity';
import { AmadeusService } from './amadeus.service';

@Module({
  imports:[TypeOrmModule.forFeature([FlightRequest,FlightPrice]),UsersModule,JwtModule],
  controllers: [FlightsController],
  providers: [FlightsService,AmadeusService],
})
export class FlightsModule {}
