import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FlightRequest } from "./flightrequest.entity";
import { User } from "src/users/entities/user.entity";

@Entity({name:"FlightPrice"})
export class FlightPrice {
@PrimaryGeneratedColumn()
id:number
@Column()
airline:string
@Column({ type: 'float' })
price:number
@Column({ type: 'varchar', length: 3 })
currency:string
@Column({type:"timestamp",default:()=> "CURRENT_TIMESTAMP"})
checkedAt:Date
@ManyToOne(() => User, (user) => user.flightPrice)
user:User
@ManyToOne(() => FlightRequest, (flightrequest) => flightrequest.flightprice)
flightrequest:FlightRequest
}
