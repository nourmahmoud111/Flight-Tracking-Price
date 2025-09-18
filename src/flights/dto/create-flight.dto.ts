import { IsDateString, IsNotEmpty, IsString } from "class-validator"

export class CreateFlightDto {
@IsString()
@IsNotEmpty()
origin:string

@IsString()
@IsNotEmpty()
destination:string

@IsDateString()
@IsNotEmpty()
travelDate:string

}
