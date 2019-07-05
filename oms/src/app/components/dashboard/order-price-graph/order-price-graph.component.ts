import {
  Component,
  OnInit,
  ViewChild,
  SimpleChange,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { DoCheck, KeyValueDiffers } from "@angular/core";

import { OrderSearchService } from "src/app/services/order-search.service";
import { ItemSearchService } from "src/app/services/item-search.service";
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: "app-order-price-graph",
  templateUrl: "./order-price-graph.component.html",
  styleUrls: ["./order-price-graph.component.css"]
})
export class OrderPriceGraphComponent implements OnChanges {
  getItemsResponse;
  @Input() responseData: any;
  itemList: Array<Item> = [];
  dataPointMap: Map<number, DataPoint[]> = new Map<number, DataPoint[]>();

  lineChartData: Array<DataSet> = null;
  lineChartLabels: Array<number> = [];
  lineChartOptions: any = {
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Order ID"
          }
        }
      ],
      yAxes: [
        {
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
    },
    plugins: {
      datalabels: {
        // hide datalabels for all datasets
        display: false
      }
    }
  };
  chartType = "line";

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;
  differ: any;

  constructor(
    private _OrderSearchService: OrderSearchService,
    private _itemSearchService: ItemSearchService
  ) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    // Extract changes to the input property by its name
    let change = changes["responseData"];
    let Response = change.currentValue;
    console.log(Response.itemsData);
    if (Response.itemsData) {
      let ItemsResponse = Response.itemsData;
      for (let curItem of ItemsResponse) {
        var newItem = {} as Item;
        newItem.itemid = curItem.itemid;
        newItem.shortdescription = curItem.shortdescription;
        this.itemList = [...this.itemList, newItem];
      }

      let OrdersResponse = Response.ordersData;
      if (OrdersResponse.length > 100) {
        OrdersResponse = OrdersResponse.slice(
          OrdersResponse.length - 100,
          OrdersResponse.length
        );
      }
      for (let order of OrdersResponse) {
        let curOrderID = order.id;
        this.lineChartLabels.push(curOrderID);
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
      this.lineChartData = [];
      let keySet = this.dataPointMap.keys();
      for (let key of keySet) {
        let curDataSet = {} as DataSet;
        curDataSet.data = this.dataPointMap.get(key).sort(function(a, b) {
          return a.x - b.x;
        });
        curDataSet.label = this.itemList.find(
          x => x.itemid == key
        ).shortdescription;
        this.lineChartData.push(curDataSet);
      }
      this.lineChartLabels.sort(function(a, b) {
        return a - b;
      });
      // console.log(this.lineChartLabels);
    }
  }

  hideAll() {
    for (let i = 0; i < this.chart.datasets.length; i++) {
      this.chart.hideDataset(i, true);
    }
    this.chart.update();
  }
  showAll() {
    for (let i = 0; i < this.chart.datasets.length; i++) {
      this.chart.hideDataset(i, false);
    }
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
  data: Array<DataPoint>;
  label: string;
}
