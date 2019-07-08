import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  role: any;
  constructor() {}

  ngOnInit() {
    if (localStorage.getItem("role") !== "admin") {
      this.role = false;
    } else {
      this.role = true;
    }
  }
}
