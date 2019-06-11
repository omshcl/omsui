import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { Order_Address } from '../order_address';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  items = ["item1", "item2", "item3"];
  costs = ["1", "2", "3", "4"];

  order_address = new Order_Address('1234 Main St', 'Apt 2825', 'Tx', 'Richardson', 752525)
  orderModel = new Order('item1', 'new item', 5, 2, 50, this.order_address)

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.orderModel)
  }

}
