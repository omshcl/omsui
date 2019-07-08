import { TestBed, async, inject } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AdminGuard } from "./admin.guard";
import { RouterModule } from "@angular/router";

describe("AdminGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])]
    });
  });

  it("should ...", inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
