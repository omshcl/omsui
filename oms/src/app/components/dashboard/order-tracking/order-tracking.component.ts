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
  days = 5;
  showChart = false;
  completedOrders: DataSet = {
    data: [],
    label: "Completed Orders (25%)"
  };
  partialOrders: DataSet = {
    data: [],
    label: "Partially Fulfilled (30%)"
  };
  openOrders: DataSet = {
    data: [],
    label: "Open Orders (80%)"
  };
  barChartData: Array<DataSet> = null;
  barChartLabels: Array<number> = [];
  public barChartPlugins = [pluginAnnotations];

  barChartOptions: any = {
    legend: {
      position: "top"
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: "Order ID"
          }
        }
      ],
      yAxes: [
        {
          minBarLength: 5,
          ticks: {
            beginAtZero: true
          },
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
  chartType = "bar";
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
        let nullDataPoint = { x: order.id, y: null };
        this.barChartLabels.push(order.id);
        if (order.demand_type == "COMPLETE_ORDER") {
          this.completedOrders.data.push(curDataPoint);
          this.partialOrders.data.push(nullDataPoint);
          this.openOrders.data.push(nullDataPoint);
        } else if (order.demand_type == "PARTIAL_ORDER") {
          this.completedOrders.data.push(nullDataPoint);
          this.partialOrders.data.push(curDataPoint);
          this.openOrders.data.push(nullDataPoint);
        } else {
          this.completedOrders.data.push(nullDataPoint);
          this.partialOrders.data.push(nullDataPoint);
          this.openOrders.data.push(curDataPoint);
        }
      }
      // console.log("Complete order", this.completedOrders);
      // console.log("Partial order", this.partialOrders);
      // console.log("Open order", this.openOrders);
      this.barChartLabels.sort(function(a, b) {
        return a - b;
      });
      this.completedOrders.data.sort(function(a, b) {
        return a.x - b.x;
      });
      this.partialOrders.data.sort(function(a, b) {
        return a.x - b.x;
      });
      this.openOrders.data.sort(function(a, b) {
        return a.x - b.x;
      });
      this.updatePercentage();
      this.barChartData = [];
      this.barChartData.push(this.completedOrders);
      this.barChartData.push(this.partialOrders);
      this.barChartData.push(this.openOrders);
      this.showChart = true;
    });
  }

  updatePercentage() {
    let completeCount = 0;
    let partialCount = 0;
    let openCount = 0;
    let totalComplete = 0;
    let totalPartial = 0;
    let totalOpen = 0;
    for (let i = 0; i < this.completedOrders.data.length; i++) {
      if (this.completedOrders.data[i].y != null) {
        totalComplete++;
        if (this.completedOrders.data[i].y <= this.days) {
          completeCount++;
        }
      }
      if (this.partialOrders.data[i].y != null) {
        totalPartial++;
        if (this.partialOrders.data[i].y <= this.days) {
          partialCount++;
        }
      }
      if (this.openOrders.data[i].y != null) {
        totalOpen++;
        if (this.openOrders.data[i].y <= this.days) {
          openCount++;
        }
      }
    }
    let completePercent = ((completeCount / totalComplete) * 100).toFixed(0);
    let partialPercent = ((partialCount / totalPartial) * 100).toFixed(0);
    let openPercent = ((openCount / totalOpen) * 100).toFixed(0);
    this.completedOrders.label = "Completed Orders (" + completePercent + "%)";
    this.partialOrders.label = "Partially Fulfilled (" + partialPercent + "%)";
    this.openOrders.label = "Open Orders (" + openPercent + "%)";
  }
  onChange() {
    // console.log("Days changed to " + this.days);
    // console.log(this.barChartOptions.annotation.annotations[0].value);
    this.barChartOptions.annotation.annotations[0].value = this.days;
    this.barChartOptions.annotation.annotations[1].yMax = this.days;
    this.barChartOptions.annotation.annotations[2].yMin = this.days;
    this.updatePercentage();
    this.chart.chart.destroy();
    this.chart.ngOnInit();
    // this.showChart = false;
    // setTimeout(() => {
    //   this.showChart = true;
    // }, 1);
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
