import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightRequest } from './entities/flightrequest.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FlightsService {

constructor(
  @InjectRepository(FlightRequest)
  private readonly _flightRequestsRepository: Repository<FlightRequest> ,
  private readonly _usersService:UsersService ,
){}


  public async createRequest( dto:CreateFlightDto,userId:number) {
    const user = await this._usersService.getCurrentUser(userId)
    const newRequest =await this._flightRequestsRepository.create({...dto, user})
    return this._flightRequestsRepository.save(newRequest)
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
