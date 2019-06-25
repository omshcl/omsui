import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../global";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  role: any;
  apiURL: string = "/api/login";
  constructor(private http: HttpClient, private globals: Globals) {}

  storeUserRole(role) {
    console.log("IN AUTH SERVICE--------" + role);
    this.role = role;
    if (role == "admin") {
      this.globals.admin = true;
    } else {
      this.globals.admin = false;
      console.log(this.globals.admin);
    }
  }
  LoginUser(LoginInfo) {
    return this.http.post<any>(this.apiURL, LoginInfo);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUser() {
    return localStorage.getItem("username");
  }

  logoutUser() {
    localStorage.removeItem("role");
  }
}
