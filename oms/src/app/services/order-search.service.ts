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

  getOrderTracking() {
    let searchLimit = {
      limit: 50
    };
    //return this.http.get("assets/ordertracking.json");
    return this.http.post("/api/orders/graph", searchLimit);
  }

  completeReservation(oid: number) {
    let orderid = { id: oid };
    return this.http.post("/api/orders/reserve", orderid);
  }

  scheduleOrders(){
    return this.http.get("/api/orders/schedule");
  }
  completeOrders(){
    return this.http.get("/api/orders/complete/remove");
  }
  finishPickup(oid: number) {
    let orderid = { id: oid };
    return this.http.post("/api/orders/customer_received", orderid);
  }
  
}
