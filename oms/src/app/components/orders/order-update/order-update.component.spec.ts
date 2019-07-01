import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { OrderUpdateComponent } from "./order-update.component";
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

describe("OrderUpdateComponent", () => {
  let component: OrderUpdateComponent;
  let fixture: ComponentFixture<OrderUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderUpdateComponent, OrderComponent],
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
    fixture = TestBed.createComponent(OrderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: "app-order",
  template: ""
})
class MockOrderComponent {}
