import { Injectable } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class SupplyserviceService {
  isreturnable = ["yes", "no"];
  productclass = ["new", "used"];
  typeList = ["onhand", "pipeline", "pickup", "ship"];
  supplyform: FormGroup;

  constructor(private formbuilder: FormBuilder) {}

  initializesupplyform(supplyFormBuilder: FormBuilder) {
    return (this.supplyform = supplyFormBuilder.group({
      itemdescription: ["", Validators.required],
      shortdescription: ["", Validators.required],
      shipbydate: ["", Validators.required],
      eta: [""],
      unitofmeasure: ["", Validators.required],
      price: ["", Validators.required],
      shippingaddress: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      type: ["", Validators.required],
      zip: ["", Validators.required],
      locationname: ["", Validators.required],
      isreturnable: ["", Validators.required],
      manufacturername: ["", Validators.required],
      category: ["", Validators.required],
      subcategory: ["", Validators.required],
      quantity: ["", Validators.required],
      productclass: ["", Validators.required]
    }));
  }

  initializeFormValues() {
    //reset default dropdown items and date

    this.setsupplyformValue("isreturnable", this.isreturnable[0]);
    this.setsupplyformValue("productclass", this.productclass[0]);

    this.setsupplyformValue("type", this.typeList[0]);

    let curDate = new Date().toISOString();
    this.setsupplyformValue("shipbydate", curDate);
    this.setsupplyformValue("eta", curDate);
  }

  setsupplyformValue(field, value) {
    this.supplyform.controls[field].setValue(value, {
      onlySelf: true
    });
  }

  fillsupplyformValues(supplydetail) {
    this.setsupplyformValue("itemdescription", supplydetail.itemdescription);
    this.setsupplyformValue("shortdescription", supplydetail.shortdescription);
    this.setsupplyformValue("unitofmeasure", supplydetail.unitofmeasure);
    this.setsupplyformValue("price", supplydetail.price);
    this.setsupplyformValue("locationname", supplydetail.locationname);
    this.setsupplyformValue("isreturnable", supplydetail.returnable);
    this.setsupplyformValue("state", supplydetail.state);
    this.setsupplyformValue("city", supplydetail.city);
    this.setsupplyformValue("shippingaddress", supplydetail.shippingaddress);
    this.setsupplyformValue("zip", supplydetail.zip);
    this.setsupplyformValue("shipbydate", supplydetail.shipbydate);
    this.setsupplyformValue("eta", supplydetail.shipbydate);
    this.setsupplyformValue("category", supplydetail.category);
    this.setsupplyformValue("subcategory", supplydetail.subcategory);
    this.setsupplyformValue("manufacturername", supplydetail.manufacturername);
    this.setsupplyformValue("quantity", supplydetail.quantity);
    this.setsupplyformValue("type", supplydetail.type);
    this.setsupplyformValue("productclass", supplydetail.productclass);
  }
}
