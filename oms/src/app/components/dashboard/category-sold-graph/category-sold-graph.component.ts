import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { OrderSearchService } from "src/app/services/order-search.service";

@Component({
  selector: "app-category-sold-graph",
  templateUrl: "./category-sold-graph.component.html",
  styleUrls: ["./category-sold-graph.component.css"]
})
export class CategorySoldGraphComponent implements OnInit {
  dataResponse;
  chart = [];

  constructor(private _OrderSearchService: OrderSearchService) {}

  ngOnInit() {
    this._OrderSearchService.getOrders().subscribe(response => {
      this.dataResponse = response;
      console.log(this.dataResponse);
    });
  }
}
