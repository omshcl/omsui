import { Component, OnInit } from '@angular/core';
import { OrderSearchService } from 'src/app/services/order-search.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  orderResponse;

  constructor(
      private _OrderSearchService: OrderSearchService
  ) {}

  ngOnInit() {
  }

  scheduleOrders(){
    this._OrderSearchService.scheduleOrders().subscribe(response => {
      this.orderResponse = response; 
      console.log(this.orderResponse);
      alert("Orders Scheduled");
    });
  }
  completeOrders(){
    this._OrderSearchService.completeOrders().subscribe(response => {
      this.orderResponse = response; 
      console.log(this.orderResponse);
      alert("Orders Complete");
    });
  }
}