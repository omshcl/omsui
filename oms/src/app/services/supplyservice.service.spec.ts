import { TestBed } from '@angular/core/testing';

import { SupplyserviceService } from './supplyservice.service';

describe('SupplyserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplyserviceService = TestBed.get(SupplyserviceService);
    expect(service).toBeTruthy();
  });
});
