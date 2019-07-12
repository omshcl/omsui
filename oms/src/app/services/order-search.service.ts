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

  getCompletedOrders(lim: number) {
    let searchLimit = {
      limit: lim
    };
    return this.http.post("/api/orders/complete", searchLimit);
  }

  full(obj) {
    return this.http.post("/api/orders/fulfill", obj);
  }
  getShipNodes() {
    return this.http.get("/api/shipnodes");
  }
}
