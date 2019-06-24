import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { OrderCreateComponent } from "./order-create.component";
import { OrderComponent } from "../order/order.component";
import { Component } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { MatTableModule } from "@angular/material";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

describe("OrderCreateComponent", () => {
  let component: OrderCreateComponent;
  let fixture: ComponentFixture<OrderCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderCreateComponent, OrderComponent],
      imports: [
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`form should be invalid`, async(() => {
    component.orderForm.controls["firstname"].setValue("");
    component.orderForm.controls["lastname"].setValue("");
    component.orderForm.controls["address"].setValue("");
    component.orderForm.controls["city"].setValue("");
    component.orderForm.controls["state"].setValue("");
    component.orderForm.controls["zip"].setValue("");
    expect(component.orderForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    component.orderForm.controls["firstname"].setValue("Abhi");
    component.orderForm.controls["lastname"].setValue("Patil");
    component.orderForm.controls["address"].setValue("1234 Main St");
    component.orderForm.controls["city"].setValue("Frisco");
    component.orderForm.controls["state"].setValue("Texas");
    component.orderForm.controls["zip"].setValue("75080");
    expect(component.orderForm.valid).toBeTruthy();
  }));

  it(`updateTotal should give currect value`, async(() => {
    component.itemForm.controls["item"].setValue("Landline");
    expect(component.getItemValue() === "Landline").toBeTruthy();
  }));
});


