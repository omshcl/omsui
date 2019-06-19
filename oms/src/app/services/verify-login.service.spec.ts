import { TestBed } from "@angular/core/testing";

import { VerifyLoginService } from "./verify-login.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("VerifyLoginService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it("should be created", () => {
    const service: VerifyLoginService = TestBed.get(VerifyLoginService);
    expect(service).toBeTruthy();
  });
});
