import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FlightRequest } from "./flightrequest.entity";
import { User } from "src/users/entities/user.entity";

@Entity({name:"FlightPrice"})
export class FlightPrice {
@PrimaryGeneratedColumn()
id:number
@Column()
airline:string
@Column()
price:number
@Column()
currency:number
@Column({type:"timestamp",default:()=> "CURRENT_TIMESTAMP"})
checkedAt:Date
@ManyToOne(() => User, (user) => user.flightPrice)
user:User
@ManyToMany(() => FlightRequest, (flightrequest) => flightrequest.flightprice)
flightrequest:FlightRequest
}
