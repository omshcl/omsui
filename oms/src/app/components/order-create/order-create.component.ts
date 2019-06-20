import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { CaseListDatasource } from "./elements-data-source";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { OrderCreateService } from "../../services/order-create.service";

export interface itemOrder {
  item: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface itemList {
  itemList: [];
  priceList: [];
}

@Component({
  selector: "app-order-create",
  templateUrl: "./order-create.component.html",
  styleUrls: ["./order-create.component.css"]
})
export class OrderCreateComponent implements OnInit {
  itemList = [];
  priceList = [];
  channelList = ["Online", "Phone", "Fax"];
  paymentList = ["Credit", "Cash", "PO"];
  itemForm;
  orderForm;
  itemLength;
  item;
  data = {};
  dataList;
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
      item: ["", Validators.required],
      quantity: ["", Validators.required],
      price: ["", Validators.required]
    });
    this.orderForm = this.formBuilder.group({
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
    });
    this.setItemFormValue("quantity", 1);
    this.setOrderFormValue("channel", this.channelList[0]);
    this.setOrderFormValue("payment", this.paymentList[0]);
    this.setOrderFormValue("total", 0);
    let curDate = new Date().toISOString();
    this.setOrderFormValue("date", curDate);
  }

  ngOnInit() {
    this._orderCreateService.getItems().subscribe(data => {
      this.dataList = data;
      for (let itemName of this.dataList) {
        this.itemList.push(itemName.description);
        this.priceList.push(itemName.price);
      }

      this.setItemFormValue("item", this.itemList[0]);
    });
  }

  getUrl() {
    return "url('https://1lz3sq2g71xv1ij3mj13d04u-wpengine.netdna-ssl.com/wp-content/uploads/2016/04/Ordoro-Order-Management-Tool.jpg')";
  }

  /**
   * Add new item to the table
   */
  addItem() {
    const itemArray = this.orderForm.controls.items as FormArray;
    const curItem = this.getItemValue();
    const curQuant = this.getQuantityValue();
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
    this.setItemFormValue("item", this.itemList[0]);

    // Add the items to the table
    const orderItems = this.orderForm.value.items;
    this.itemLength = orderItems.length;
    this.items.push({
      item: orderItems[this.itemLength - 1].item,
      quantity: orderItems[this.itemLength - 1].quantity,
      price: orderItems[this.itemLength - 1].price,
      subtotal: orderItems[this.itemLength - 1].subtotal
    });
    this.subject.next(this.items);
    // Update order total
    this.updateTotal();
  }

  removeItem(i: any) {
    var itemArray = this.orderForm.controls.items as FormArray;
    itemArray.removeAt(i);
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
    this._orderCreateService.postOrder(this.orderForm.value);
    this.orderForm.reset();
    const itemArray = this.orderForm.controls.items as FormArray;
    itemArray.clear();
    //clear item table
    this.items = [];
    this.subject.next(this.items);
    //reset default dropdown items and date

    this.setItemFormValue("item", this.itemList[0]);
    this.setItemFormValue("quantity", 1);
    this.setOrderFormValue("channel", this.channelList[0]);
    this.setOrderFormValue("payment", this.paymentList[0]);
    this.setOrderFormValue("total", 0);
    let curDate = new Date().toISOString();
    this.setOrderFormValue("date", curDate);
    this.processedOrder();
  }

  processedOrder() {
    alert("Order has been placed");
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

  getItemValue() {
    return this.itemForm.get("item").value;
  }

  getQuantityValue() {
    return this.itemForm.get("quantity").value;
  }

  getPriceValue() {
    return this.itemForm.get("price").value;
  }

  get firstname() {
    return this.orderForm.get("firstname");
  }

  get lastname() {
    return this.orderForm.get("lastname");
  }

  get quantity() {
    return this.itemForm.get("quantity");
  }

  get address() {
    return this.orderForm.get("address");
  }
  get city() {
    return this.orderForm.get("city");
  }
  get state() {
    return this.orderForm.get("state");
  }
  get zip() {
    return this.orderForm.get("zip");
  }
}
