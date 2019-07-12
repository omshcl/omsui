import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { OrderSearchService } from "src/app/services/order-search.service";
import { BaseChartDirective } from "ng2-charts";
import * as pluginAnnotations from "chartjs-plugin-annotation";

@Component({
  selector: "app-order-tracking",
  templateUrl: "./order-tracking.component.html",
  styleUrls: ["./order-tracking.component.css"]
})
export class OrderTrackingComponent implements OnInit {
  getOrdersResponse;
  @Input() responseData: any;
  completedOrders: DataSet = {
    data: [],
    label: "Completed Orders",
    steppedLine: false
  };
  partialOrders: DataSet = {
    data: [],
    label: "Partial Orders",
    steppedLine: false
  };
  openOrders: DataSet = {
    data: [],
    label: "Open Orders",
    steppedLine: false
  };
  lineChartData: Array<DataSet> = null;
  lineChartLabels: Array<number> = [];
  public lineChartPlugins = [pluginAnnotations];
  days = 3;
  lineChartOptions: any = {
    legend: {
      position: "bottom"
    },
    elements: {
      line: {
        tension: 0,
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
    },
    annotation: {
      drawTime: "beforeDatasetsDraw",
      annotations: [
        {
          type: "line",
          mode: "horizontal",
          scaleID: "y-axis-0",
          value: this.days,
          borderColor: "black",
          borderWidth: 3
          // label: {
          //   enabled: true,
          //   fontColor: 'white',
          //   content: 'Days'
          // }
        },
        {
          type: "box",
          id: "a-box-2",
          yScaleID: "y-axis-0",
          yMin: 0,
          yMax: this.days,
          backgroundColor: "#33cc3318"
        },
        {
          type: "box",
          id: "a-box-3",
          yScaleID: "y-axis-0",
          yMin: this.days,
          //yMax: 5,
          backgroundColor: "#ff002818"
        }
      ]
    }
  };
  chartType = "line";
  differ: any;

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;

  constructor(private _OrderSearchService: OrderSearchService) {}

  ngOnInit() {
    this._OrderSearchService.getOrderTracking().subscribe(resp => {
      this.getOrdersResponse = resp;
      console.log(this.getOrdersResponse);
      for (let order of this.getOrdersResponse) {
        let curDataPoint = {} as DataPoint;
        curDataPoint.x = order.id;
        curDataPoint.y = order.days;
        this.lineChartLabels.push(order.id);
        if (order.demand_type == "COMPLETED_ORDER") {
          this.completedOrders.data.push(curDataPoint);
        } else if (order.demand_type == "PARTIAL_ORDER") {
          this.partialOrders.data.push(curDataPoint);
        } else {
          this.openOrders.data.push(curDataPoint);
        }
      }
      console.log("Complete order", this.completedOrders);
      console.log("Partial order", this.partialOrders);
      console.log("Open order", this.openOrders);
      this.lineChartData = [];
      this.lineChartData.push(this.completedOrders);
      this.lineChartData.push(this.partialOrders);
      this.lineChartData.push(this.openOrders);
    });
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

export interface DataPoint {
  x: number; //orderid
  y: number; //days
}

export interface DataSet {
  data: Array<DataPoint>;
  label: string;
  steppedLine: boolean;
}
