import { TestBed } from '@angular/core/testing';

import { OrderSearchService } from './order-search.service';

describe('OrderSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderSearchService = TestBed.get(OrderSearchService);
    expect(service).toBeTruthy();
  });
});
