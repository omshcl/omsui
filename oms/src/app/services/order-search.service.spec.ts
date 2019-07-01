import { TestBed } from "@angular/core/testing";

import { OrderSearchService } from "./order-search.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("OrderSearchService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it("should be created", () => {
    const service: OrderSearchService = TestBed.get(OrderSearchService);
    expect(service).toBeTruthy();
  });
});
