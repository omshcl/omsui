import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  getLineData() {
    return this.http.get("assets/distribution.json");
    // return this.http.get(
    //   "https://my.api.mockaroo.com/distribution.json?key=ac4c9b70"
    // );
  }

  getPieData() {
    return this.http.get("assets/sales.json");
    // return this.http.get("https://my.api.mockaroo.com/sales.json?key=ac4c9b70");
  }

  getBarData() {
    return this.http.get("assets/supply.json");
    // return this.http.get(
    //   "https://my.api.mockaroo.com/supply.json?key=ac4c9b70"
    // );
  }
}
