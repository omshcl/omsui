import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { OrderSearchComponent } from "./order-search.component";
import { OrderComponent } from "../order/order.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MatInputModule } from "@angular/material";
import {
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule
} from "@angular/material";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
describe("OrderSearchComponent", () => {
  let component: OrderSearchComponent;
  let fixture: ComponentFixture<OrderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSearchComponent, OrderComponent],
      providers: [RouterModule],
      imports: [
        ReactiveFormsModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatInputModule,
        BrowserAnimationsModule
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
