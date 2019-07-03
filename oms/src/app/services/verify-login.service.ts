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
  apiURL: string = "/api/login";
  constructor(private http: HttpClient) {}

  verifyBackend(userL) {
    return this.http.post(this.apiURL, {
        username: userL.value.user,
        password: userL.value.yes
      })
      .subscribe(
        data => {
          this.redirect(data);
        },
        error => {
          console.error("Error posting order!");

          return false;
        }
      );
  }

  redirect(data) {
    if (data.isValid && data.isAdmin) {
      localStorage.setItem("role", "admin");
      location.href = "./order";
    } else if (data.isValid && !data.isAdmin) {
      localStorage.setItem("role", "user");
      location.href = "./order-agent";
    } else {
      alert("Invalid Login. Check credentials.");
    }
    return true;
  }

  checkCookie() {
    return this.http.get( "/api/validate").subscribe()
 }
}
