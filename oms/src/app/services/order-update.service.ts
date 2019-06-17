import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OrderUpdateService {
  apiURL: string = "/api/orders/update";
  constructor(private http: HttpClient) {}

  postOrder(updateOrder) {
    return this.http.post(this.apiURL, updateOrder).subscribe(
      data => {
        console.log(data);
        return true;
      },
      error => {
        console.error("Error posting order!");
        return false;
      }
    );
  }

  getItems() {
    return this.http.get("/api/items/list");
  }

  getInfo(orderID) {
    return this.http.post("/api/orders/getinfo", { id: orderID });
  }
}
