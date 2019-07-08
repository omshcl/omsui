import { Component, OnInit, ViewChild } from "@angular/core";
import { OrderSearchService } from "../../../services/order-search.service";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { element } from "protractor";
import { getLocaleDateFormat } from "@angular/common";
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
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private _orderSearchService: OrderSearchService) {}

  ngOnInit() {
    if (localStorage.getItem("role") !== "admin") {
      this.displayedColumns.splice(7, 1);
    }
    this._orderSearchService.getOrders().subscribe(response => {
      this.getOrdersResp = response;
      for (let order of this.getOrdersResp) {
        if (order.demand_type != "COMPLETE_ORDER") {
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
      }
      this.dataSource = new MatTableDataSource(this.elementData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  fulfill(orderid) {
    console.log("fulfill clicked");
    let today = new Date();
    let date = ("0" + today.getDate()).slice(-2);
    let month = ("0" + today.getMonth()).slice(-2);
    let year = today.getFullYear();
    let current_date = month + "/" + date + "/" + year;
    console.log(current_date);
    let obj = { id: orderid, delivery_date: current_date };
    console.log(obj);
    this._orderSearchService.full(obj).subscribe(response => {
      this.getOrdersResp = response;
    });
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
