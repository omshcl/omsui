import { TestBed } from "@angular/core/testing";

import { SupplyserviceService } from "./supplyservice.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule } from "@angular/forms";

describe("SupplyserviceService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule]
    })
  );

  it("should be created", () => {
    const service: SupplyserviceService = TestBed.get(SupplyserviceService);
    expect(service).toBeTruthy();
  });
});
