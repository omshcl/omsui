import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { Chart } from "chart.js";

@Component({
  selector: "app-bar",
  templateUrl: "./bar.component.html",
  styleUrls: ["./bar.component.css"]
})
export class BarComponent implements OnInit {
  dataResponse;
  chart = [];
  chartType = "bar";

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this._dataService.getBarData().subscribe(response => {
      console.log(response);
      this.dataResponse = response;
      let months = ["January", "February", "March", "April", "May", "June"];
      let laptop = this.dataResponse.map(dataResponse => dataResponse.laptop);
      let pixel = this.dataResponse.map(dataResponse => dataResponse.pixel);

      this.chart = new Chart("barchart", {
        type: this.chartType,
        data: {
          labels: months,
          datasets: [
            {
              data: laptop,
              borderColor: "#4682b4",
              backgroundColor: "#4682b4",
              // fill: false,
              label: "Lenovo Laptop"
            },
            {
              data: pixel,
              borderColor: "#ff7f50",
              backgroundColor: "#ff7f50",
              // fill: false,
              label: "Google Pixel"
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "H1 2019 Net Supply/Demand for Austin ShipNode"
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

  changeStyle() {
    if (this.chartType == "bar") this.chartType = "horizontalBar";
    else this.chartType = "bar";
    let months = ["January", "February", "March", "April", "May", "June"];
    let laptop = this.dataResponse.map(dataResponse => dataResponse.laptop);
    let pixel = this.dataResponse.map(dataResponse => dataResponse.pixel);

    this.chart = new Chart("barchart", {
      type: this.chartType,
      data: {
        labels: months,
        datasets: [
          {
            data: laptop,
            borderColor: "#4682b4",
            backgroundColor: "#4682b4",
            label: "Lenovo Laptop"
          },
          {
            data: pixel,
            borderColor: "#ff7f50",
            backgroundColor: "#ff7f50",
            label: "Google Pixel"
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "H1 2019 Net Supply/Demand for Austin ShipNode"
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
  }
}
