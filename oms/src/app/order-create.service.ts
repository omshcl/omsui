import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class OrderCreateService {
  apiURL: string = "https://2ffaca7f.ngrok.io/orders/new";
  constructor(private http: HttpClient) {}

  postOrder(newOrder) {
    return this.http.post(this.apiURL, newOrder).subscribe(
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
}
