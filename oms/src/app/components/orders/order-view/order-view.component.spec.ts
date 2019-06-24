import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OrderViewComponent } from "./order-view.component";
import { ReactiveFormsModule } from "@angular/forms";
import { OrderComponent } from "../order/order.component";
import { Component } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { MatTableModule } from "@angular/material";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { RouterModule } from "@angular/router";
import { APP_BASE_HREF } from "@angular/common";

describe("viewComponent", () => {
  let component: OrderViewComponent;
  let fixture: ComponentFixture<OrderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderViewComponent, OrderComponent],
      imports: [
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: "/" }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
