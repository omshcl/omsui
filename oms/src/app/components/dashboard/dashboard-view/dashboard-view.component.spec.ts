import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { OrderComponent } from "../../orders/order/order.component";
import { DashboardViewComponent } from "./dashboard-view.component";
import { OrderPriceGraphComponent } from "../order-price-graph/order-price-graph.component";
import { CategorySoldGraphComponent } from "../category-sold-graph/category-sold-graph.component";
import { Component } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterModule } from "@angular/router";
import { ChartsModule } from "ng2-charts";
import { APP_BASE_HREF } from '@angular/common';
describe("DashboardViewComponent", () => {
  let component: DashboardViewComponent;
  let fixture: ComponentFixture<DashboardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardViewComponent,
        OrderComponent,
        OrderPriceGraphComponent,
        CategorySoldGraphComponent
      ],
      imports: [HttpClientTestingModule, RouterModule.forRoot([]), ChartsModule],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
    ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardViewComponent);
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
