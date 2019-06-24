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
import { OrderService } from "src/app/services/order.service";

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
    private _orderService: OrderService,
    private route: ActivatedRoute
  ) {
    this.itemForm = this._orderService.initializeItemForm(formBuilder);
    this.orderForm = this._orderService.initializeOrderForm(
      formBuilder,
      this.orderID
    );

    this.getOrderId();

    this._orderService.initializeFormValues();
  }

  ngOnInit() {
    this.getItemsFromService();

    this.getOrderInfoFromService();
  }

  getOrderId() {
    this.route.paramMap.subscribe(params => {
      this.orderID = params.get("orderID");
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

  getItemsFromService() {
    this._orderUpdateService.getItems().subscribe(data => {
      this.dataList = data;
      for (let itemName of this.dataList) {
        this.itemId[itemName.shortdescription] = itemName.itemid;
        this.itemList.push(itemName.shortdescription);
        this.priceList.push(itemName.price);
      }
      this._orderService.setItemFormValue("item", this.itemList[0]);
    });
  }

  fillOrderFormValues(orderDetail) {
    this._orderService.setOrderFormValue("id", this.orderID);
    this._orderService.setOrderFormValue("firstname", orderDetail.firstname);
    this._orderService.setOrderFormValue("lastname", orderDetail.lastname);
    this._orderService.setOrderFormValue("lastname", orderDetail.lastname);
    this._orderService.setOrderFormValue("lastname", orderDetail.lastname);
    this._orderService.setOrderFormValue("lastname", orderDetail.lastname);
    this._orderService.setOrderFormValue("state", orderDetail.state);
    this._orderService.setOrderFormValue("city", orderDetail.city);
    this._orderService.setOrderFormValue("address", orderDetail.address);
    this._orderService.setOrderFormValue("zip", orderDetail.zip);
    this._orderService.setOrderFormValue("date", orderDetail.date);
    this._orderService.setOrderFormValue("channel", orderDetail.channel);
    this._orderService.setOrderFormValue("payment", orderDetail.payment);
  }

  fillItemsTable(orderDetail) {
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
    // Refresh the table
    this.updateTotal();
    this.subject.next(this.items);
  }

  getOrderInfoFromService() {
    this._orderUpdateService.getInfo(this.orderID).subscribe(data => {
      this.dataList = data;
      const orderDetail = this.dataList;
      console.log(orderDetail);

      this.fillOrderFormValues(orderDetail);

      this.fillItemsTable(orderDetail);
    });
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
    this._orderService.setItemFormValue("item", this.itemList[0]);

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

  resetOrderFormArray() {
    this.orderForm.reset();
    const itemArray = this.orderForm.controls.items as FormArray;
    itemArray.clear();
    //clear item table
    this.items = [];
    this.subject.next(this.items);
  }

  createOrder() {
    // Process checkout data here
    console.warn("Your order has been submitted", this.orderForm.value);
    //this.http.post("example.com", this.orderForm.value).subscribe();
    this._orderUpdateService.postOrder(this.orderForm.value);

    this.resetOrderFormArray();

    this._orderService.initializeFormValues();
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
