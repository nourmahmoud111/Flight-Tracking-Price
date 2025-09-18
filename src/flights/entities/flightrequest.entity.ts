import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FlightPrice } from "./flightprice.entity";

@Entity({name:"FlightRequest"})
export class FlightRequest {
@PrimaryGeneratedColumn()
id:number
@Column()
origin:string
@Column()
destination:string
@Column()
travelDate:Date
@CreateDateColumn({type:"timestamp",default:()=> "CURRENT_TIMESTAMP"})
createdAt:Date
@ManyToOne(() => User, (user) => user.flightrequests)
user:User
@OneToMany(() => FlightPrice, (flightprice) => flightprice.flightrequest)
flightprice:FlightPrice[]
}
