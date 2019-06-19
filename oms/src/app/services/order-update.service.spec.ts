import { TestBed } from "@angular/core/testing";

import { OrderUpdateService } from "./order-update.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("OrderUpdateService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it("should be created", () => {
    const service: OrderUpdateService = TestBed.get(OrderUpdateService);
    expect(service).toBeTruthy();
  });
});
