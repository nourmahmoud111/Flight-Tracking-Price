import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FlightRequest } from "./flightrequest.entity";

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
@ManyToOne(() => FlightRequest, (flightrequest) => flightrequest.flightprice, {onDelete: 'CASCADE'})
flightrequest:FlightRequest
}
