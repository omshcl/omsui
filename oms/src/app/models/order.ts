import { Order_Address } from "./order_address";
export class Order {
  item: string;
  itemDescription: string;
  quantity: number;
  unitcost: number;
  totalcost: number;
  address: Order_Address;
}
