import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class SupplyCreateService {
  apiURL: string = "/api/supply/new";
  constructor(private http: HttpClient) {}

  postOrder(supplyOrder) {
    return this.http.post(this.apiURL, supplyOrder).subscribe(
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
    return this.http.get("/api/shipnodes");
  }
}
