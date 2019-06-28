import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { Chart } from "chart.js";

@Component({
  selector: "app-line",
  templateUrl: "./line.component.html",
  styleUrls: ["./line.component.css"]
})
export class LineComponent implements OnInit {
  dataResponse;
  chart = [];

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this._dataService.getLineData().subscribe(response => {
      console.log(response);
      this.dataResponse = response;
      let dayNum = this.dataResponse.map(dataResponse => dataResponse.id);
      let pDist = this.dataResponse.map(dataResponse => dataResponse.poisson);
      let nDist = this.dataResponse.map(dataResponse => dataResponse.normal);

      this.chart = new Chart("linechart", {
        type: "line",
        data: {
          labels: dayNum,
          datasets: [
            {
              data: pDist,
              borderColor: "#4682b4",
              backgroundColor: "#4682b4",
              fill: false,
              label: "Poisson Distribution"
            },
            {
              data: nDist,
              borderColor: "#ff7f50",
              backgroundColor: "#ff7f50",
              fill: false,
              label: "Normal Distribution"
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Random Distributions with a Mean of 50"
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
}
