import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { SupplyCreateService } from './supply-create.service';

describe('SupplyCreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplyCreateService = TestBed.get(SupplyCreateService);
    expect(service).toBeTruthy();
  });
});
