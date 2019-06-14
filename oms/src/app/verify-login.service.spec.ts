import { TestBed } from '@angular/core/testing';
import {Component, View} from 'angular2/core';

import { VerifyLoginService } from './verify-login.service';

describe('VerifyLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerifyLoginService = TestBed.get(VerifyLoginService);
    expect(service).toBeTruthy();
  });
});
