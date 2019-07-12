import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { CaseListDatasource } from "./elements-data-source";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { OrderUpdateService } from "../../../services/order-update.service";
import { ActivatedRoute } from "@angular/router";
import { itemOrder } from "src/app/models/itemOrder";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-view",
  templateUrl: "./order-view.component.html",
  styleUrls: ["./order-view.component.css"]
})
export class OrderViewComponent implements OnInit {
  orderID;
  itemList = [];
  priceList = [];
  channelList = ["Online", "Phone", "Fax"];
  paymentList = ["Credit", "Cash", "PO"];
  itemForm;
  orderForm;
  itemLength;
  item;
  data = {};
  itemId = {};
  dataList;
  items: itemOrder[] = [];
  displayedColumns: string[] = ["item", "quantity", "price", "subtotal"];
  subject = new BehaviorSubject(this.items);
  dataSource = new CaseListDatasource(this.subject.asObservable());
  httpClient: any;
  role: any;
  constructor(
    private formBuilder: FormBuilder,
    private itemFormBuilder: FormBuilder,
    private _orderService: OrderService,
    private _orderUpdateService: OrderUpdateService,
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
    if (localStorage.getItem("role") !== "admin") {
      this.role = false;
    } else {
      this.role = true;
    }
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

  redirect(id) {
    location.href = "./order/update/" + id;
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
