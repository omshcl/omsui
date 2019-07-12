import { Component, OnInit, Input } from "@angular/core";
import { OrderSearchService } from "src/app/services/order-search.service";

@Component({
  selector: "app-order-tracking",
  templateUrl: "./order-tracking.component.html",
  styleUrls: ["./order-tracking.component.css"]
})
export class OrderTrackingComponent implements OnInit {
  getOrdersResponse;
  @Input() responseData: any;
  completedOrders: Array<DataPoint> = [];
  partialOrders: Array<DataPoint> = [];
  openOrders: Array<DataPoint> = [];
  lineChartData: Array<DataSet> = [];
  lineChartLabels: Array<number> = [];
  lineChartOptions: any = {
    elements: {
      line: {
        tension: 0.2,
        fill: false
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
            labelString: "Days"
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
  constructor(private _OrderSearchService: OrderSearchService) {}

  ngOnInit() {
    this._OrderSearchService.getOrderTracking().subscribe(resp => {
      this.getOrdersResponse = resp;
      console.log(this.getOrdersResponse);
    });
  }
}

export interface DataPoint {
  x: number; //orderid
  y: number; //days
}

export interface DataSet {
  data: Array<DataPoint>;
  label: string;
}
