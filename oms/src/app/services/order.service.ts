import { Injectable } from "@angular/core";
import { FormBuilder, Validators, FormGroup, FormArray } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  channelList = ["Online", "Phone", "Fax"];
  paymentList = ["Credit", "Cash", "PO"];
  discountList = [0, 5, 10, 15, 20];
  itemForm: FormGroup;
  orderForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  initializeItemForm(itemFormBuilder: FormBuilder) {
    return (this.itemForm = itemFormBuilder.group({
      item: ["", Validators.required],
      quantity: ["", Validators.required],
      price: ["", Validators.required],
      discount: ""
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
    this.setItemFormValue("discount", this.discountList[0]);
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

  createItemForm(itemFormBuilder: FormBuilder, item) {
    return itemFormBuilder.group({
      itemid: item["itemid"],
      quantity: item["quantity"],
      price: item["price"],
      subtotal: item["quantity"] * item["price"]
    });
  }

  fillOrderFormValues(orderDetail) {
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
  }

  getCurrentItemInfo(itemList, priceList) {
    const curItem = this.getItemValue();
    const curQuant = this.getQuantityValue();
    let itemIndex = itemList.indexOf(curItem);
    const curPrice = priceList[itemIndex];
    const curSubTotal = curPrice * curQuant;

    return {
      curItem: curItem,
      curQuant: curQuant,
      curPrice: curPrice,
      curSubTotal: curSubTotal
    };
  }

  fillItemsTable(orderDetail, items) {
    const itemArray = this.orderForm.controls.items as FormArray;
    // Update the Order Table
    for (const item of orderDetail.items) {
      items.push({
        item: item["shortdescription"],
        price: item["price"],
        quantity: item["quantity"],
        subtotal: item["quantity"] * item["price"]
      });

      const group = this.createItemForm(this.formBuilder, item);

      itemArray.push(group);
    }
    // Refresh the table
    this.updateTotal(items);

    return items;
  }

  addItemInfoToJSON(itemInfo, itemId) {
    const itemArray = this.orderForm.controls.items as FormArray;

    // Create Item Form to push current Item info to FormArray
    const item = {
      itemid: itemId[itemInfo.curItem],
      quantity: itemInfo.curQuant,
      price: itemInfo.curPrice,
      subtotal: itemInfo.curSubTotal
    };
    const group = this.createItemForm(this.formBuilder, item);
    itemArray.push(group);
  }

  addItemInfoToItemTable(itemInfo, items) {
    // Add the items to the table
    items.push({
      item: itemInfo.curItem,
      quantity: itemInfo.curQuant,
      price: itemInfo.curPrice,
      subtotal: itemInfo.curSubTotal
    });
    // Update order total
    this.updateTotal(items);
    return items;
  }

  resetOrderFormArray() {
    this.orderForm.reset();
    const itemArray = this.orderForm.controls.items as FormArray;
    itemArray.clear();
  }

  updateTotal(items) {
    let curTotal = 0;
    for (let item of items) {
      curTotal += item.price * item.quantity;
    }
    this.orderForm.get("total").setValue(curTotal);
  }

  applyDiscount(price) {
    console.log("Apply Discount works");
    const discountPerc = this.getDiscountValue();
    let curPrice = price;
    let discountprice = (discountPerc * curPrice) / 100;
    curPrice -= discountprice;
    return curPrice;
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

  getDiscountValue() {
    return this.itemForm.get("discount").value;
  }

  getPriceValue() {
    return this.itemForm.get("price").value;
  }

  getUrl() {
    return "url('https://1lz3sq2g71xv1ij3mj13d04u-wpengine.netdna-ssl.com/wp-content/uploads/2016/04/Ordoro-Order-Management-Tool.jpg')";
  }
}
