import { Exclude } from "class-transformer";
import { FlightRequest } from "src/flights/entities/flightrequest.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"Users"})
export class User {
@PrimaryGeneratedColumn()
id:number
@Column()
name:string
@Column()
email:string
@Column()
@Exclude()
password:string
@CreateDateColumn({type:"timestamp",default:()=> "CURRENT_TIMESTAMP"})
createdAt:Date
@OneToMany(() => FlightRequest, (flightrequests) => flightrequests.user)
flightrequests:FlightRequest[]
}
