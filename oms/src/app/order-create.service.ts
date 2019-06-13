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
  apiURL: string = "http://3ab08cc9.ngrok.io/login";
  constructor(private http: HttpClient) {}

  postOrder() {
    return this.http
      .post(this.apiURL, {
        username: "admin",
        password: "Admin!123"
      })
      .subscribe(
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
