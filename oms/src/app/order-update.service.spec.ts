import { TestBed } from '@angular/core/testing';

import { OrderUpdateService } from './order-update.service';

describe('OrderUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderUpdateService = TestBed.get(OrderUpdateService);
    expect(service).toBeTruthy();
  });
});
