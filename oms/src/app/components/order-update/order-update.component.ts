import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormArray,
  Validators,
  Form,
  FormGroup
} from "@angular/forms";
import { CaseListDatasource } from "./elements-data-source";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { OrderUpdateService } from "../../services/order-update.service";
import { ActivatedRoute } from "@angular/router";
import { itemOrder } from "src/app/models/itemOrder";

@Component({
  selector: "app-order-update",
  templateUrl: "./order-update.component.html",
  styleUrls: ["./order-update.component.css"]
})
export class OrderUpdateComponent implements OnInit {
  orderID;
  itemList = [];
  priceList = [];
  channelList = ["Online", "Phone", "Fax"];
  paymentList = ["Credit", "Cash", "PO"];
  itemForm: FormGroup;
  orderForm: FormGroup;
  itemLength;
  item;
  data = {};
  itemId = {};
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
    private _orderUpdateService: OrderUpdateService,
    private route: ActivatedRoute
  ) {
    this.itemForm = this.initializeItemForm(formBuilder);
    this.orderForm = this.initializeOrderForm(formBuilder);

    this.getOrderId();

    this.initializeFormValues();
  }

  initializeFormValues() {
    this.setItemFormValue("quantity", 1);
    this.setOrderFormValue("channel", this.channelList[0]);
    this.setOrderFormValue("payment", this.paymentList[0]);
    this.setOrderFormValue("total", 0);
    let curDate = new Date().toISOString();
    this.setOrderFormValue("date", curDate);
  }

  getOrderId() {
    this.route.paramMap.subscribe(params => {
      this.orderID = params.get("orderID");
    });
  }

  initializeItemForm(itemFormBuilder: FormBuilder) {
    return itemFormBuilder.group({
      item: ["", Validators.required],
      quantity: ["", Validators.required],
      price: ["", Validators.required]
    });
  }

  createItemForm(itemFormBuilder: FormBuilder, item) {
    return itemFormBuilder.group({
      itemid: item["itemid"],
      quantity: item["quantity"],
      price: item["price"],
      subtotal: item["quantity"] * item["price"]
    });
  }

  initializeOrderForm(orderFormBuilder: FormBuilder) {
    return orderFormBuilder.group({
      id: this.orderID,
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
  }

  getItemsFromService() {
    this._orderUpdateService.getItems().subscribe(data => {
      this.dataList = data;
      for (let itemName of this.dataList) {
        this.itemId[itemName.shortdescription] = itemName.itemid;
        this.itemList.push(itemName.shortdescription);
        this.priceList.push(itemName.price);
      }
      this.setItemFormValue("item", this.itemList[0]);
    });
  }

  getOrderInfoFromService() {
    this._orderUpdateService.getInfo(this.orderID).subscribe(data => {
      this.dataList = data;
      const orderDetail = this.dataList;
      console.log(orderDetail);
      this.setOrderFormValue("id", this.orderID);
      this.setOrderFormValue("firstname", orderDetail.firstname);
      this.setOrderFormValue("lastname", orderDetail.lastname);
      this.setOrderFormValue("lastname", orderDetail.lastname);
      this.setOrderFormValue("lastname", orderDetail.lastname);
      this.setOrderFormValue("lastname", orderDetail.lastname);
      this.setOrderFormValue("state", orderDetail.state);
      this.setOrderFormValue("city", orderDetail.city);
      this.setOrderFormValue("address", orderDetail.address);
      this.setOrderFormValue("zip", orderDetail.zip);
      this.setOrderFormValue("date", orderDetail.date);
      this.setOrderFormValue("channel", orderDetail.channel);
      this.setOrderFormValue("payment", orderDetail.payment);

      const itemArray = this.orderForm.controls.items as FormArray;
      // Update the Order Table
      for (const item of orderDetail.items) {
        this.items.push({
          item: item["shortdescription"],
          price: item["price"],
          quantity: item["quantity"],
          subtotal: item["quantity"] * item["price"]
        });

        const group = this.createItemForm(this.formBuilder, item);

        itemArray.push(group);
      }
      this.updateTotal();
      this.subject.next(this.items);
    });
  }

  ngOnInit() {
    this.getItemsFromService();

    this.getOrderInfoFromService();
  }

  getCurrentItemInfo() {
    const curItem = this.getItemValue();
    const curQuant = this.getQuantityValue();
    let itemIndex = this.itemList.indexOf(curItem);
    const curPrice = this.priceList[itemIndex];
    const curSubTotal = curPrice * curQuant;

    return {
      curItem: curItem,
      curQuant: curQuant,
      curPrice: curPrice,
      curSubTotal: curSubTotal
    };
  }

  addItemInfoToJSON(itemInfo) {
    const itemArray = this.orderForm.controls.items as FormArray;

    // Create Item Form to push current Item info to FormArray
    const item = {
      itemid: this.itemId[itemInfo.curItem],
      quantity: itemInfo.curQuant,
      price: itemInfo.curPrice,
      subtotal: itemInfo.curSubTotal
    };
    const group = this.createItemForm(this.formBuilder, item);
    itemArray.push(group);
  }

  addItemInfoToItemTable(itemInfo) {
    // Add the items to the table
    this.items.push({
      item: itemInfo.curItem,
      quantity: itemInfo.curQuant,
      price: itemInfo.curPrice,
      subtotal: itemInfo.curQuant
    });
    // Refresh the item table
    this.subject.next(this.items);
    // Update order total
    this.updateTotal();
  }

  addItemToTableAndJSON() {
    var itemInfo = this.getCurrentItemInfo();

    this.addItemInfoToJSON(itemInfo);

    //reset item back to 'default' selected
    this.setItemFormValue("item", this.itemList[0]);

    this.addItemInfoToItemTable(itemInfo);
  }

  removeItem(tableIndex: any) {
    var itemArray = this.orderForm.controls.items as FormArray;
    // Remove Item From ItemForm Array
    itemArray.removeAt(tableIndex);
    // Remove Item From Item Table
    this.items.splice(tableIndex, 1);
    this.subject.next(this.items);
    // Update order total
    this.updateTotal();
  }

  createOrder() {
    // Process checkout data here
    console.warn("Your order has been submitted", this.orderForm.value);
    //this.http.post("example.com", this.orderForm.value).subscribe();
    this._orderUpdateService.postOrder(this.orderForm.value);
    this.orderForm.reset();
    const itemArray = this.orderForm.controls.items as FormArray;
    itemArray.clear();
    //clear item table
    this.items = [];
    this.subject.next(this.items);
    //reset default dropdown items and date

    this.setItemFormValue("item", this.channelList[0]);
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

  getUrl() {
    return "url('https://1lz3sq2g71xv1ij3mj13d04u-wpengine.netdna-ssl.com/wp-content/uploads/2016/04/Ordoro-Order-Management-Tool.jpg')";
  }
}
