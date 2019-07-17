import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";
import { CaseListDatasource } from "./elements-data-source";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { OrderCreateService } from "../../../services/order-create.service";
import { OrderService } from "../../../services/order.service";
import { itemOrder } from "../../../models/itemOrder";
import { ItemSearchService } from "src/app/services/item-search.service";
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
  ordertypeList = ["Pickup", "Ship", "Reservation"];
  discountList = [0, 5, 10, 15, 20];
  itemForm: FormGroup;
  orderForm: FormGroup;
  quantityForm: FormGroup;
  priceForm: FormGroup;
  itemLength: Int16Array;
  data = {};
  itemId = {};
  dataList;
  isOrderShip: Boolean = false;
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
  getShipNodesResponse;
  public shipNodeList: Array<ShipNode> = [];
  httpClient: any;

  constructor(
    private formBuilder: FormBuilder,
    private itemFormBuilder: FormBuilder,
    private _orderCreateService: OrderCreateService,
    private _itemSearchService: ItemSearchService,
    private _orderService: OrderService
  ) {
    this.itemForm = this._orderService.initializeItemForm(formBuilder);
    this.orderForm = this._orderService.initializeOrderForm(formBuilder, 0);
    this._orderService.initializeFormValues();
  }

  ngOnInit() {
    this._itemSearchService.getShipNodes().subscribe(response => {
      this.getShipNodesResponse = response;
      for (let curNode of this.getShipNodesResponse) {
        this.shipNodeList.push(curNode.locationname);
      }
      this._orderService.setOrderFormValue("shipnode", this.shipNodeList[0]);
    });
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
    // Update price of item and subtotal based on discount
    itemInfo.curPrice = this._orderService.applyDiscount(itemInfo.curPrice);
    itemInfo.curSubTotal = itemInfo.curPrice * itemInfo.curQuant;

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
    // Remove quantity and price array0
    this._orderService.removeQtyandPrice(tableIndex);
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

    this._orderService.setOrderFormValue("shipnode", this.shipNodeList[0]);
    this._orderService.initializeFormValues();

    this.processedOrder();
  }
  onOptionsSelected(value) {
    if (value === "Ship") {
      this._orderService.setOrderFormValue("shipnode", "");
      this.isOrderShip = true;
    } else {
      this.isOrderShip = false;
    }
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
  get shipnode() {
    return this.itemForm.get("shipnode");
  }
  get ordertype() {
    return this.itemForm.get("ordertype");
  }
}
export interface ShipNode {
  locationname: string;
}
