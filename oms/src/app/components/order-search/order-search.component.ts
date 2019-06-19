import { Component, OnInit } from "@angular/core";
import { OrderSearchService } from "../../services/order-search.service";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-order-search",
  templateUrl: "./order-search.component.html",
  styleUrls: ["./order-search.component.css"]
})
export class OrderSearchComponent implements OnInit {
  getOrdersResp;
  orders;
  displayedColumns = [
    "id",
    "date",
    "demand",
    "firstname",
    "lastname",
    "zip",
    "total",
    "actions"
  ];
  elementData: Element[] = [];
  dataSource;

  constructor(private _orderSearchService: OrderSearchService) {}

  ngOnInit() {
    this._orderSearchService.getOrders().subscribe(response => {
      this.getOrdersResp = response;
      for (let order of this.getOrdersResp) {
        this.elementData.push({
          id: order.id,
          date: order.date.slice(0, 10),
          demand: order.demand_type,
          firstname: order.firstname,
          lastname: order.lastname,
          zip: order.zip,
          total: order.total
        });
      }
      this.dataSource = new MatTableDataSource(this.elementData);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  updateOrder(id) {
    // location.href = "/order/update/" + id;
    console.log(id);
  }
}

export interface Element {
  id: any;
  date: any;
  demand: any;
  firstname: any;
  lastname: any;
  zip: any;
  total: any;
}