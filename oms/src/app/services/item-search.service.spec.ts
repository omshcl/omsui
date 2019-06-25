import { TestBed } from "@angular/core/testing";

import { ItemSearchService } from "./item-search.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ItemSearchService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it("should be created", () => {
    const service: ItemSearchService = TestBed.get(ItemSearchService);
    expect(service).toBeTruthy();
  });
});
