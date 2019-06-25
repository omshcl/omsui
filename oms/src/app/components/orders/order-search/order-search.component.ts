import { Component, OnInit, ViewChild } from "@angular/core";
import { OrderSearchService } from "../../../services/order-search.service";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
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
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
