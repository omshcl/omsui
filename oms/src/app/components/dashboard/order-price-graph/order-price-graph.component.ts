import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Chart } from "chart.js";
import { OrderSearchService } from "src/app/services/order-search.service";
import { ItemSearchService } from "src/app/services/item-search.service";

@Component({
  selector: "app-order-price-graph",
  templateUrl: "./order-price-graph.component.html",
  styleUrls: ["./order-price-graph.component.css"]
})
export class OrderPriceGraphComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {}
  getItemsResponse;
  getOrdersResponse;
  chart = [] as Chart;
  itemList: Array<Item> = [];
  dataLabels: Array<number> = [];
  dataPointMap: Map<number, DataPoint[]> = new Map<number, DataPoint[]>();
  dataSetArray: Array<DataSet> = [];
  colors = [
    "#011627",
    "#e71d36",
    "#ff9f1c",
    "#50514f",
    "#f25f5c",
    "#75cd3f",
    "#247ba0",
    "#70c1b3"
  ];

  constructor(
    private _OrderSearchService: OrderSearchService,
    private _itemSearchService: ItemSearchService
  ) {}

  ngOnInit() {}

  ngAfterContentInit() {
    this._itemSearchService.getItems().subscribe(iresp => {
      this.getItemsResponse = iresp;

      for (let curItem of this.getItemsResponse) {
        var newItem = {} as Item;
        newItem.itemid = curItem.itemid;
        newItem.shortdescription = curItem.shortdescription;
        this.itemList = [...this.itemList, newItem];
      }

      this._OrderSearchService.getOrders().subscribe(oresp => {
        this.getOrdersResponse = oresp;
        // console.log(this.getOrdersResponse);
        for (let order of this.getOrdersResponse) {
          let curOrderID = parseInt(order.id);
          this.dataLabels.push(curOrderID);
          for (let item of order.items) {
            let curItemID = item.itemid;
            let curPrice = item.price;
            let curDataPoint = {} as DataPoint;
            curDataPoint.x = curOrderID;
            curDataPoint.y = curPrice;
            if (this.dataPointMap.has(curItemID)) {
              this.dataPointMap.get(curItemID).push(curDataPoint);
            } else {
              let dataPointArray: Array<DataPoint> = [];
              dataPointArray.push(curDataPoint);
              this.dataPointMap.set(curItemID, dataPointArray);
            }
          }
        }
        let keySet = this.dataPointMap.keys();
        for (let key of keySet) {
          let curDataSet = {} as DataSet;
          curDataSet.spanGaps = false;
          curDataSet.showLine = true;
          curDataSet.data = this.dataPointMap.get(key).sort(function(a, b) {
            return a.x - b.x;
          });
          let curColor = this.colors.pop();
          curDataSet.borderColor = curColor;
          curDataSet.backgroundColor = curColor;
          curDataSet.fill = false;
          curDataSet.label = this.itemList.find(
            x => x.itemid == key
          ).shortdescription;
          this.dataSetArray.push(curDataSet);
        }
        this.dataLabels.sort(function(a, b) {
          return a - b;
        });
        console.log(this.dataLabels);

        //build line chart
        this.chart = new Chart("linechart", {
          type: "line",
          data: {
            labels: this.dataLabels,
            datasets: this.dataSetArray
          },
          options: {
            title: {
              display: true,
              text: "Price per Order"
            },
            legend: {
              display: true
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "Order ID"
                  }
                }
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "Price"
                  },
                  ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                      return "$" + value;
                    }
                  }
                }
              ]
            }
          }
        });
      });
    });
  }
  showAll() {
    // console.log("Show all");
    this.chart.data.datasets.forEach(ds => {
      ds._meta[0].hidden = false;
      // console.log(ds._meta);
    });
    this.chart.update();
  }
}

export interface Item {
  itemid: number;
  shortdescription: string;
}

export interface DataPoint {
  x: number; //orderid
  y: number; //price
}

export interface DataSet {
  spanGaps: boolean;
  showLine: boolean;
  data: Array<DataPoint>;
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
  label: string;
}
