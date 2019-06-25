import { Injectable } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class SupplyserviceService {
  ReturnableList: ["Yes", "No"];
  productList: ["new", "USed"];
  typeList: ["Onhand", "Pipeline"];
  supplyform: FormGroup;

  constructor(private formbuilder: FormBuilder) {}

  initializesupplyform(supplyFormBuilder: FormBuilder) {
    return (this.supplyform = supplyFormBuilder.group({
      shortdescription: ["", Validators.required],
      Date: ["", Validators.required],
      unitofmeasure: ["", Validators.required],
      price: ["", Validators.required],
      shippingaddress: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      type: ["", Validators.required],
      zip: ["", Validators.required],
      locationname: ["", Validators.required],
      returnable: ["", Validators.required],
      manufacturername: ["", Validators.required],
      category: ["", Validators.required],
      subcategory: ["", Validators.required],
      Quantity: ["", Validators.required]
    }));
  }

  initializeFormValues() {
    //reset default dropdown items and date

    // this.setsupplyformValue("returnable", this.ReturnableList[0]);
    // this.setsupplyformValue("productclass", this.productList[0]);

    // this.setsupplyformValue("type", this.typeList[0]);

    let curDate = new Date().toISOString();
    this.setsupplyformValue("Date", curDate);
  }
  setsupplyformValue(field, value) {
    this.supplyform.controls[field].setValue(value, {
      onlySelf: true
    });
  }
  fillsupplyformValues(supplydetail) {
    this.setsupplyformValue("shortdescription", supplydetail.shortdescription);
    this.setsupplyformValue("unitofmeasure", supplydetail.unitofmeasure);
    this.setsupplyformValue("price", supplydetail.price);
    this.setsupplyformValue("locationname", supplydetail.locationname);
    this.setsupplyformValue("returnable", supplydetail.returnable);
    this.setsupplyformValue("state", supplydetail.state);
    this.setsupplyformValue("city", supplydetail.city);
    this.setsupplyformValue("shippingaddress", supplydetail.shippingaddress);
    this.setsupplyformValue("zip", supplydetail.zip);
    this.setsupplyformValue("Date", supplydetail.Date);
    this.setsupplyformValue("category", supplydetail.category);
    this.setsupplyformValue("subcategory", supplydetail.subcategory);
    this.setsupplyformValue("manufacturername", supplydetail.manufacturername);
    this.setsupplyformValue("Quantity", supplydetail.Quantity);
    this.setsupplyformValue("type", supplydetail.type);
  }
}
