import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { OrderSearchComponent } from "./order-search.component";
import { OrderComponent } from "../order/order.component";
import { Component } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { MatTableModule, MatFormFieldModule } from "@angular/material";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

describe("OrderSearchComponent", () => {
  let component: OrderSearchComponent;
  let fixture: ComponentFixture<OrderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSearchComponent, OrderComponent],
      imports: [
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatFormFieldModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
