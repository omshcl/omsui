import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";
import { SupplyCreateService } from "../../../services/supply-create.service";
import { supply_order } from "../../../models/supply_order";
import { SupplyserviceService } from "../../../services/supplyservice.service";
import { Router } from "@angular/router";
import { ItemSearchService } from "src/app/services/item-search.service";
@Component({
  selector: "app-create-supply",
  templateUrl: "./create-supply.component.html",
  styleUrls: ["./create-supply.component.css"]
})
export class CreateSupplyComponent implements OnInit {
  supplyform: FormGroup;
  isreturnable = ["yes", "no"];
  productList = ["new", "used"];
  typeList = ["onhand", "pipeline"];
  getShipNodesResponse;
  public shipNodeList: Array<ShipNode> = [];
  httpClient: any;

  constructor(
    private formBuilder: FormBuilder,
    private _SupplycreateService: SupplyCreateService,
    private _supplyService: SupplyserviceService,
    private _itemSearchService: ItemSearchService
  ) {
    this.supplyform = this._supplyService.initializesupplyform(formBuilder);
    this._supplyService.initializeFormValues();
  }

  ngOnInit() {
    this._itemSearchService.getShipNodes().subscribe(response => {
      this.getShipNodesResponse = response;
      for (let curNode of this.getShipNodesResponse) {
        this.shipNodeList.push(curNode.locationname);
      }
      this.setsupplyformValue("locationname", this.shipNodeList[0]);
    });
  }

  supplycreateOrder() {
    console.warn("Your order has been created", this.supplyform.value);
    this._SupplycreateService.postOrder(this.supplyform.value);
    this.supplyform.reset();
    this._supplyService.setsupplyformValue(
      "isreturnable",
      this.isreturnable[0]
    );
    this._supplyService.setsupplyformValue("type", this.typeList[0]);
    this._supplyService.setsupplyformValue("productclass", this.productList[0]);
    this._supplyService.setsupplyformValue(
      "locationname",
      this.shipNodeList[0]
    );
    this._supplyService.setsupplyformValue(
      "locationname",
      this.shipNodeList[0]
    );
    let curDate = new Date().toISOString();
    this.setsupplyformValue("shipbydate", curDate);
    this.setsupplyformValue("eta", curDate);
  }

  processedOrder() {
    alert("Order has been placed");
  }

  setsupplyformValue(field, value) {
    this.supplyform.controls[field].setValue(value, {
      onlySelf: true
    });
  }

  get returnable() {
    return this.supplyform.get("isreturnable");
  }

  get itemdescription() {
    return this.supplyform.get("itemdescription");
  }

  get shortdescription() {
    return this.supplyform.get("shortdescription");
  }

  get unitofmeasure() {
    return this.supplyform.get("unitofmeasure");
  }
  get price() {
    return this.supplyform.get("price");
  }

  get category() {
    return this.supplyform.get("category");
  }
  get subcategory() {
    return this.supplyform.get("subcategory");
  }
  get productclass() {
    return this.supplyform.get("productclass");
  }
  get type() {
    return this.supplyform.get("type");
  }
  get locationname() {
    return this.supplyform.get("locationname");
  }

  get quantity() {
    return this.supplyform.get("quantity");
  }

  get manufacturername() {
    return this.supplyform.get("manufacturername");
  }
  get shippingaddress() {
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
export interface ShipNode {
  locationname: string;
}
