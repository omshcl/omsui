import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { SupplyCreateService } from "../../../services/supply-create.service";

@Component({
  selector: "app-create-supply",
  templateUrl: "./create-supply.component.html",
  styleUrls: ["./create-supply.component.css"]
})
export class CreateSupplyComponent implements OnInit {
  supplyform;
  productList = ["new", "USed"];
  typeList = ["Onhand", "Pipeline"];
  ReturnableList = ["Yes", "NO"];
  shipnodeList = [];

  constructor(
    private formBuilder: FormBuilder,
    private _SupplycreateService: SupplyCreateService
  ) {
    this.supplyform = this.formBuilder.group({
      date: ["", Validators.required],
      shortdescription: ["", Validators.required],
      unitofmeasure: ["", Validators.required],
      price: ["", Validators.required],
      isreturnable: ["", Validators.required],
      typeList: ["", Validators.required],
      quantity: ["", Validators.required],
      shipnode: ["", Validators.required],
      manufacturername: ["", Validators.required],
      category: ["", Validators.required],
      subcategory: ["", Validators.required],
      productclass: ["", Validators.required],
      shippingaddress: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zip: ["", Validators.required]
    });
    let currDate = new Date().toISOString();
    this.setsupplyformValue("date", currDate);
  }

  ngOnInit() {}

  supplycreateOrder() {
    console.warn("Your order has been created", this.supplyform.value);
    this._SupplycreateService.postOrder(this.supplyform.value);
    this.supplyform.reset();
  }

  processedOrder() {
    alert("Order has been placed");
  }

  setsupplyformValue(field, value) {
    this.supplyform.controls[field].setValue(value, {
      onlySelf: true
    });
  }

  get shortdesc() {
    return this.supplyform.get("shortdescription");
  }

  get Unitmeasure() {
    return this.supplyform.get("unitofmeasure");
  }
  get price() {
    return this.supplyform.get("price");
  }
  get Returnable() {
    return this.supplyform.get("isreturnable");
  }

  get Category() {
    return this.supplyform.get("category");
  }
  get SubCategory() {
    return this.supplyform.get("subcategory");
  }
  get Product() {
    return this.supplyform.get("productclass");
  }
  get type() {
    return this.supplyform.get("type");
  }
  get shipnode() {
    return this.supplyform.get("shipnode");
  }
  get manufacturename() {
    return this.supplyform.get("manufacturername");
  }
  get address() {
    return this.supplyform.get("shippingaddress");
  }
  get city() {
    return this.supplyform.get("city");
  }
  get state() {
    return this.supplyform.get("state");
  }
  get zip() {
    return this.supplyform.get("zip");
  }
}
