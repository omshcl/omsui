import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { OrderSearchService } from "src/app/services/order-search.service";

@Component({
  selector: "app-order-price-graph",
  templateUrl: "./order-price-graph.component.html",
  styleUrls: ["./order-price-graph.component.css"]
})
export class OrderPriceGraphComponent implements OnInit {
  dataResponse;
  chart = [] as Chart;
  // chart = [];
  mylabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  data1 = [
    { x: 1, y: 2000 },
    { x: 2, y: 1900 },
    { x: 3, y: 2000 },
    { x: 4, y: 1850 },
    { x: 5, y: 1875 },
    { x: 6, y: 2000 },
    { x: 7, y: 1600 },
    { x: 8, y: 1950 },
    { x: 9, y: 2000 },
    { x: 10, y: 2000 }
  ];

  data2 = [
    { x: 1, y: 45 },
    // { x: 2, y: 135 },
    { x: 3, y: 40 },
    { x: 4, y: 50 },
    // { x: 5, y: 130 },
    { x: 6, y: null },
    { x: 7, y: 40 },
    // { x: 8, y: 135 },
    // { x: 9, y: 118 },
    { x: 10, y: 50 }
  ];

  data3 = [10, 20, 15, 12, 17, 15, 13, 12, 11, 10];
  constructor(private _OrderSearchService: OrderSearchService) {}

  ngOnInit() {
    this._OrderSearchService.getLineData().subscribe(response => {
      console.log(response);
      this.dataResponse = response;
      let dayNum = this.dataResponse.map(dataResponse => dataResponse.id);
      let pDist = this.dataResponse.map(dataResponse => dataResponse.poisson);
      let nDist = this.dataResponse.map(dataResponse => dataResponse.normal);
      console.log("start");
      console.log(dayNum);
      console.log(pDist);
      console.log("stop");

      this.chart = new Chart("linechart", {
        type: "line",
        data: {
          labels: this.mylabels,
          datasets: [
            {
              spanGaps: false,
              showLine: true,
              data: this.data2,
              borderColor: "#4682b4",
              backgroundColor: "#4682b4",
              fill: false,
              label: "Keyboard"
            },
            {
              data: this.data1,
              borderColor: "#ff7f50",
              backgroundColor: "#ff7f50",
              fill: false,
              label: "Laptop",
              showLine: true
            }
          ]
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
                display: true
              }
            ],
            yAxes: [
              {
                display: true
              }
            ]
          }
        }
      });
    });
  }

  showAll() {
    console.log("Show all");
    this.chart.data.datasets.forEach(ds => {
      ds._meta[0].hidden = false;
      console.log(ds._meta);
    });
    this.chart.update();
  }
}
