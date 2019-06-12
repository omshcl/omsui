import {Order_Address} from './order_address'
export class Order{
    constructor(
        public item: string,
        public itemDescription: string,
        public quantity: number,
        public unitcost: number,
        public totalcost: number,
        public address: Order_Address
    ){}
}