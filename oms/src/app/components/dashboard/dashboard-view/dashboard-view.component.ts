import { Component, OnInit } from "@angular/core";
import { OrderSearchService } from "src/app/services/order-search.service";
import { ItemSearchService } from "src/app/services/item-search.service";

@Component({
  selector: "app-dashboard-view",
  templateUrl: "./dashboard-view.component.html",
  styleUrls: ["./dashboard-view.component.css"]
})
export class DashboardViewComponent implements OnInit {
  getItemsResponse: any;
  getOrdersResponse: any;
  responseData: { itemsData: any; ordersData: any };
  constructor(
    private _OrderSearchService: OrderSearchService,
    private _itemSearchService: ItemSearchService
  ) {}

  ngOnInit() {
    this.responseData = {
      itemsData: this.getItemsResponse,
      ordersData: this.getOrdersResponse
    };
    this._itemSearchService.getItems().subscribe(iresp => {
      this.getItemsResponse = iresp;

      this._OrderSearchService.getCompletedOrders(100).subscribe(oresp => {
        this.getOrdersResponse = oresp;
        // console.log(this.getOrdersResponse);
        this.responseData = {
          itemsData: this.getItemsResponse,
          ordersData: this.getOrdersResponse
        };
      });
    });
  }
}
