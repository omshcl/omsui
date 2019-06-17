import { Component, OnInit } from "@angular/core";
import { VerifyLoginService } from "../../services/verify-login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user = {
    Name: ""
  };

  yes = {
    paper: ""
  };

  constructor(private _verifyLoginService: VerifyLoginService) {}

  ngOnInit() {}

  onSubmit(e) {
    this._verifyLoginService.verifyBackend(e);
  }
}
