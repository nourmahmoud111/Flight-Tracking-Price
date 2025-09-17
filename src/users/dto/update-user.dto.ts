import { IsNotEmpty,  IsOptional,  IsString, Length, MinLength,  } from "class-validator"

export class UpdateUserDto {

@IsString()
@Length(2,150)
@IsOptional()
name? :string



@IsString()
@IsNotEmpty()
@MinLength(6)
@IsOptional()
password? :string


}
