import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";
import { CaseListDatasource } from "./elements-data-source";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { OrderCreateService } from "../../services/order-create.service";
import { OrderService } from "src/app/services/order.service";
import { itemOrder } from "src/app/models/itemOrder";

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
  itemForm: FormGroup;
  orderForm: FormGroup;
  itemLength: Int16Array;
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
    private itemFormBuilder: FormBuilder,
    private _orderCreateService: OrderCreateService,
    private _orderService: OrderService
  ) {
    this.itemForm = this._orderService.initializeItemForm(formBuilder);
    this.orderForm = this._orderService.initializeOrderForm(formBuilder, 0);
    this._orderService.initializeFormValues();
  }

  ngOnInit() {
    this.getItemsFromService();
  }

  getItemsFromService() {
    this._orderCreateService.getItems().subscribe(data => {
      this.dataList = data;
      for (let itemName of this.dataList) {
        this.itemId[itemName.shortdescription] = itemName.itemid;
        this.itemList.push(itemName.shortdescription);
        this.priceList.push(itemName.price);
      }
      this._orderService.setItemFormValue("item", this.itemList[0]);
    });
  }

  /**
   * Add new item to the table
   */
  addItemToTableAndJSON() {
    var itemInfo = this._orderService.getCurrentItemInfo(
      this.itemList,
      this.priceList
    );

    this._orderService.addItemInfoToJSON(itemInfo, this.itemId);

    //reset item back to 'default' selected
    this._orderService.setItemFormValue("item", this.itemList[0]);

    this.items = this._orderService.addItemInfoToItemTable(
      itemInfo,
      this.items
    );

    // Refresh the item table
    this.subject.next(this.items);
  }

  removeItem(tableIndex: any) {
    var itemArray = this.orderForm.controls.items as FormArray;
    // Remove Item From ItemForm Array
    itemArray.removeAt(tableIndex);
    // Remove Item From Item Table
    this.items.splice(tableIndex, 1);
    this.subject.next(this.items);
    // Update order total
    this._orderService.updateTotal(this.items);
  }

  createOrder() {
    // Process checkout data here
    console.warn("Your order has been submitted", this.orderForm.value);
    //this.http.post("example.com", this.orderForm.value).subscribe();
    this._orderCreateService.postOrder(this.orderForm.value);

    this._orderService.resetOrderFormArray();

    //clear item table
    this.items = [];
    this.subject.next(this.items);

    this._orderService.initializeFormValues();

    this.processedOrder();
  }

  processedOrder() {
    alert("Order has been placed");
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
