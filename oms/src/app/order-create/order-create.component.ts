import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  itemList = ['Item 1', 'Item 2', 'Item 3'];
  priceList = [199.99, 29.99, 49.99];
  channelList = ['Online', 'Phone', 'Fax'];
  paymentList = ['Credit', 'Cash', 'PO'];
  itemForm;
  orderForm;  

  constructor( 
    private formBuilder: FormBuilder,
    private itemFormBuilder: FormBuilder,
  ) {
    this.itemForm = itemFormBuilder.group({
      item: '',
      quantity: '' ,
      //price: ''
    });
    this.orderForm = this.formBuilder.group({
      items: this.formBuilder.array([]),
      channel: '',
      date: '',
      firstname: '',
      lastname: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      payment: ''
    });
    this.itemForm.controls['item'].setValue(this.itemList[0], {onlySelf: true});
    this.orderForm.controls['channel'].setValue(this.channelList[0], {onlySelf: true});
    this.orderForm.controls['payment'].setValue(this.paymentList[0], {onlySelf: true});
  }

  ngOnInit() {
  }

  addItem() {
    const itemArray = this.orderForm.controls.items as FormArray;
    const curItem = this.itemForm.get('item').value;
    const curQuant = this.itemForm.get('quantity').value;
    const group = this.itemFormBuilder.group({
      item: curItem,
      quantity: curQuant
    });
    itemArray.push(group);
    console.log(this.orderForm.value);
    this.itemForm.controls['item'].setValue(this.itemList[0], {onlySelf: true});
  }

  createOrder() {
    // Process checkout data here
    console.warn('Your order has been submitted', this.orderForm.value);

    //this.orderForm.reset();
  }


}