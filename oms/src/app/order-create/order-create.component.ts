import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormArray } from "@angular/forms";
import { Sort, MatTableDataSource } from "@angular/material";
import { CaseListDatasource } from "./elements-data-source";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { OrderCreateService } from "../order-create.service";

export interface itemOrder {
  item: string;
  quantity: number;
  price: number;
  subtotal: number;
}

@Component({
  selector: "app-order-create",
  templateUrl: "./order-create.component.html",
  styleUrls: ["./order-create.component.css"]
})
export class OrderCreateComponent implements OnInit {
  itemList = ["Item 1", "Item 2", "Item 3"];
  priceList = [199, 29, 49];
  channelList = ["Online", "Phone", "Fax"];
  paymentList = ["Credit", "Cash", "PO"];
  itemForm;
  orderForm;
  itemLength;
  currentTotal;

  items: itemOrder[] = [];
  displayedColumns: string[] = [
    "item",
    "quantity",
    "price",
    "subtotal",
    "actions"
  ];
  subject = new BehaviorSubject(this.items);
  dataSource = new CaseListDatasource(this.subject.asObservable());
  httpClient: any;

  constructor(
    private formBuilder: FormBuilder,
    private itemFormBuilder: FormBuilder,
    private _orderCreateService: OrderCreateService
  ) {
    this.itemForm = itemFormBuilder.group({
      item: "",
      quantity: "",
      price: ""
    });
    this.orderForm = this.formBuilder.group({
      items: this.formBuilder.array([]),
      channel: "",
      date: "",
      firstname: "",
      lastname: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      payment: "",
      total: ""
    });
    this.itemForm.controls["item"].setValue(this.itemList[0], {
      onlySelf: true
    });
    this.orderForm.controls["channel"].setValue(this.channelList[0], {
      onlySelf: true
    });
    this.orderForm.controls["payment"].setValue(this.paymentList[0], {
      onlySelf: true
    });
    this.orderForm.controls["total"].setValue(0, { onlySelf: true });
    let curDate = new Date().toISOString();
    this.orderForm.controls["date"].setValue(curDate, { onlySelf: true });
    this.currentTotal = 0;
  }

  ngOnInit() {}

  getUrl() {
    return "url('https://1lz3sq2g71xv1ij3mj13d04u-wpengine.netdna-ssl.com/wp-content/uploads/2016/04/Ordoro-Order-Management-Tool.jpg')";
  }

  addItem() {
    const itemArray = this.orderForm.controls.items as FormArray;
    const curItem = this.itemForm.get("item").value;
    const curQuant = this.itemForm.get("quantity").value;
    var itemIndex = this.itemList.indexOf(curItem);
    const curPrice = this.priceList[itemIndex];
    let subTotal = curPrice * curQuant;
    const group = this.itemFormBuilder.group({
      item: curItem,
      quantity: curQuant,
      price: curPrice,
      subtotal: subTotal
    });
    itemArray.push(group);
    //reset item back to 'default' selected
    this.itemForm.controls["item"].setValue(this.itemList[0], {
      onlySelf: true
    });

    // Add the items to the table
    this.itemLength = this.orderForm.value.items.length;
    this.items.push({
      item: this.orderForm.value.items[this.itemLength - 1].item,
      quantity: this.orderForm.value.items[this.itemLength - 1].quantity,
      price: this.orderForm.value.items[this.itemLength - 1].price,
      subtotal: this.orderForm.value.items[this.itemLength - 1].subtotal
    });
    this.subject.next(this.items);
    // Update order total
    this.updateTotal();
    console.log(this.orderForm.value);
  }

  updateTotal() {
    let curTotal = 0;
    for (let item of this.items) {
      curTotal += item.price * item.quantity;
    }
    this.orderForm.get("total").setValue(curTotal);
  }

  getTotal() {
    return this.orderForm.get("total").value;
  }

  removeItem(i: any) {
    this.orderForm.value.items.splice(i, 1);
    this.items.splice(i, 1);
    this.subject.next(this.items);
    // Update order total
    this.updateTotal();
    console.log(this.orderForm.value.items);
  }

  createOrder() {
    // Process checkout data here
    console.warn("Your order has been submitted", this.orderForm.value);
    //this.http.post("example.com", this.orderForm.value).subscribe();
    var bool = this._orderCreateService.postOrder();
    console.log(bool);
    //this.orderForm.reset();
  }
}
