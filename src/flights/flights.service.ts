import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightRequest } from './entities/flightrequest.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { FlightPrice } from './entities/flightprice.entity';
import { AmadeusService } from './amadeus.service';

@Injectable()
export class FlightsService {

constructor(
  @InjectRepository(FlightRequest)
  private readonly _flightRequestsRepository: Repository<FlightRequest> ,
  @InjectRepository(FlightPrice)
  private readonly _flightPricesRepository:Repository<FlightPrice>,
  private readonly _usersService:UsersService ,
  private readonly _amadeusService:AmadeusService,
){}



  public async createRequest( dto:CreateFlightDto,userId:number) {
    const user = await this._usersService.getCurrentUser(userId)
  // call Amadeus
    const offers = await this._amadeusService.searchFlights( 
    dto.origin,
    dto.destination,
    dto.travelDate,
  );
    const newRequest =await this._flightRequestsRepository.create({...dto, user})
   const savedRequest = await this._flightRequestsRepository.save(newRequest)
   
   let savedPrice : FlightPrice | null = null;;
  // store first offer (or all)
    if (offers.length > 0) {
    const { airline, price, currency } = offers[0];
    const flightPrice = this._flightPricesRepository.create({
      airline,
      price: parseFloat(price),
      currency,
      flightrequest: savedRequest,
    });
     savedPrice = await this._flightPricesRepository.save(flightPrice);
  }
  return {price: savedPrice} ;
  }



  public getAll() {
    return this._flightRequestsRepository.find({relations:["user"]}) ; //get requests with thier users in response
  }



  public async getSingleRequest(id: number) {
  const request = await this._flightRequestsRepository.findOne({where:{id} ,relations:["user"]}) //get request with his user in response
  if(!request) throw new NotFoundException("Request not found")
    return request
  }
}
