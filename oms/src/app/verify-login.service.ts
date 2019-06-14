import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class VerifyLoginService {
  apiURL: string = "https://2ffaca7f.ngrok.io/login";
  constructor(private http: HttpClient) {}

  verifyBackend(userL) {
    return this.http
      .post(this.apiURL, {
        username: userL.value.user,
        password: userL.value.yes
      })
      .subscribe(
        data => {
          if(data[0].isValid && data[0].isAdmin) {
            location.href = "./order"
          }
          else if(data[0].isValid && !data[0].isAdmin) {
            location.href = "./order-agent"
          }
          else {
                 alert("Invalid Login. Check credentials.")
               }
          return true;
        },
        error => {
          console.error("Error posting order!");
          return false;
        }
      );
  }
}
