import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { OrderCreateService } from "./order-create.service";

describe("OrderCreateService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it("should be created", () => {
    const service: OrderCreateService = TestBed.get(OrderCreateService);
    expect(service).toBeTruthy();
  });
});
