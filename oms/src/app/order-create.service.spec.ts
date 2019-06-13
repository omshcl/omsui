import { TestBed } from '@angular/core/testing';

import { OrderCreateService } from './order-create.service';

describe('OrderCreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderCreateService = TestBed.get(OrderCreateService);
    expect(service).toBeTruthy();
  });
});
