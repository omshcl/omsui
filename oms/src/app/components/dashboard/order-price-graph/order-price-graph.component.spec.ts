import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { OrderPriceGraphComponent } from "./order-price-graph.component";
import { ChartsModule } from "ng2-charts";

describe("OrderPriceGraphComponent", () => {
  let component: OrderPriceGraphComponent;
  let fixture: ComponentFixture<OrderPriceGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderPriceGraphComponent],
      imports: [ChartsModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPriceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
