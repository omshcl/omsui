import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OrderSearchService {
  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get("/api/orders/list");
  }

  //service for chart.js testing
  getLineData() {
    return this.http.get("assets/distribution.json");
    // return this.http.get(
    //   "https://my.api.mockaroo.com/distribution.json?key=ac4c9b70"
    // );
  }
}
