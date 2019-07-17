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
import { OrderUpdateService } from "../../../services/order-update.service";
import { ActivatedRoute } from "@angular/router";
import { itemOrder } from "src/app/models/itemOrder";
import { OrderService } from "src/app/services/order.service";
import { ItemSearchService } from "src/app/services/item-search.service";
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
  ordertypeList = ["Pickup", "Ship", "Reservation"];
  discountList = [0, 5, 10, 15, 20];
  itemForm: FormGroup;
  orderForm: FormGroup;
  itemLength: Int16Array;
  item;
  isOrderShip: Boolean = false;
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
  getShipNodesResponse;
  public shipNodeList: Array<ShipNode> = [];
  httpClient: any;

  constructor(
    private formBuilder: FormBuilder,
    private itemFormBuilder: FormBuilder,
    private _orderUpdateService: OrderUpdateService,
    private _orderService: OrderService,
    private _itemSearchService: ItemSearchService,
    private route: ActivatedRoute
  ) {
    this.itemForm = this._orderService.initializeItemForm(formBuilder);
    this.orderForm = this._orderService.initializeOrderForm(
      formBuilder,
      this.orderID
    );

    this.updateOrderId();

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

    this.getOrderInfoFromService();
  }

  updateOrderId() {
    this.route.paramMap.subscribe(params => {
      this.orderID = params.get("orderID");
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

  getOrderInfoFromService() {
    this._orderUpdateService.getInfo(this.orderID).subscribe(data => {
      this.dataList = data;
      const orderDetail = this.dataList;
      console.log(orderDetail);

      this._orderService.setOrderFormValue("id", this.orderID);
      this._orderService.fillOrderFormValues(orderDetail);

      this.items = this._orderService.fillItemsTable(orderDetail, this.items);
      

      this.subject.next(this.items);
    });
  }

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
    this._orderUpdateService.postOrder(this.orderForm.value);

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
    return this.orderForm.get("shipnode");
  }
  get ordertype() {
    return this.orderForm.get("ordertype");
  }
}
export interface ShipNode {
  locationname: string;
}
