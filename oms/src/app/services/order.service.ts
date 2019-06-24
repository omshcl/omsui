import { Injectable } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  channelList = ["Online", "Phone", "Fax"];
  paymentList = ["Credit", "Cash", "PO"];
  itemForm: FormGroup;
  orderForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  initializeItemForm(itemFormBuilder: FormBuilder) {
    return (this.itemForm = itemFormBuilder.group({
      item: ["", Validators.required],
      quantity: ["", Validators.required],
      price: ["", Validators.required]
    }));
  }

  initializeOrderForm(orderFormBuilder: FormBuilder, orderId) {
    return (this.orderForm = orderFormBuilder.group({
      id: orderId,
      items: this.formBuilder.array([]),
      channel: ["", Validators.required],
      date: ["", Validators.required],
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zip: ["", Validators.required],
      payment: ["", Validators.required],
      total: ""
    }));
  }

  initializeFormValues() {
    //reset default dropdown items and date
    this.setItemFormValue("quantity", 1);
    this.setOrderFormValue("channel", this.channelList[0]);
    this.setOrderFormValue("payment", this.paymentList[0]);
    this.setOrderFormValue("total", 0);
    let curDate = new Date().toISOString();
    this.setOrderFormValue("date", curDate);
  }

  setOrderFormValue(field, value) {
    this.orderForm.controls[field].setValue(value, {
      onlySelf: true
    });
  }

  setItemFormValue(field, value) {
    this.itemForm.controls[field].setValue(value, {
      onlySelf: true
    });
  }
}
