import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPriceGraphComponent } from './order-price-graph.component';

describe('OrderPriceGraphComponent', () => {
  let component: OrderPriceGraphComponent;
  let fixture: ComponentFixture<OrderPriceGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPriceGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPriceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
