import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { Chart } from "chart.js";

@Component({
  selector: "app-pie",
  templateUrl: "./pie.component.html",
  styleUrls: ["./pie.component.css"]
})
export class PieComponent implements OnInit {
  dataResponse;
  chart = [];
  chartType = "pie";

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this._dataService.getPieData().subscribe(response => {
      console.log(response);
      this.dataResponse = response;
      let names = this.dataResponse.map(dataResponse => dataResponse.name);
      let sales = this.dataResponse.map(dataResponse => dataResponse.sales);
      let totalsales = 0;
      sales.forEach(element => {
        totalsales += element;
      });
      this.chart = new Chart("piechart", {
        type: this.chartType,
        data: {
          datasets: [
            {
              data: sales,
              backgroundColor: [
                "#50514f",
                "#f25f5c",
                "#ffe066",
                "#247ba0",
                "#70c1b3"
              ]
            }
          ],
          labels: names
        },

        options: {
          title: {
            display: true,
            text: "First Quarter Sales Figures: $" + totalsales
          },
          legend: {
            display: true
          }
        }
      });
    });
  }

  changeStyle() {
    if (this.chartType == "pie") this.chartType = "doughnut";
    else this.chartType = "pie";
    let names = this.dataResponse.map(dataResponse => dataResponse.name);
    let sales = this.dataResponse.map(dataResponse => dataResponse.sales);
    let totalsales = 0;
    sales.forEach(element => {
      totalsales += element;
    });
    this.chart = new Chart("piechart", {
      type: this.chartType,
      data: {
        datasets: [
          {
            data: sales,
            backgroundColor: [
              "#50514f",
              "#f25f5c",
              "#ffe066",
              "#247ba0",
              "#70c1b3"
            ]
          }
        ],
        labels: names
      },

      options: {
        title: {
          display: true,
          text: "First Quarter Sales Figures: $" + totalsales
        },
        legend: {
          display: true
        }
      }
    });
  }
}
