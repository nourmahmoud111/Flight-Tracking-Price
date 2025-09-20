import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { AuthGuard } from 'src/users/guards/auth.guard';
import type { jWTPayloadType } from 'src/utils/types';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';

@Controller('/api/flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post()
  @UseGuards(AuthGuard)
  public createNewRequest(@Body() body: CreateFlightDto,@CurrentUser() payload:jWTPayloadType) {
    return this.flightsService.createRequest(body, payload.id);
  }

  @Get()
  public getAllRequest() {
    return this.flightsService.getAll() ;
  }


  @Get('history')
  @UseGuards(AuthGuard)
  public getHistory(@CurrentUser() payload:jWTPayloadType) {
    return this.flightsService.getFlightHistory( payload.id)  ;
  }

  

}
