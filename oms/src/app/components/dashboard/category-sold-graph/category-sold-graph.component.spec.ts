import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ChartsModule } from "ng2-charts";
import { CategorySoldGraphComponent } from "./category-sold-graph.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("CategorySoldGraphComponent", () => {
  let component: CategorySoldGraphComponent;
  let fixture: ComponentFixture<CategorySoldGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategorySoldGraphComponent],
      imports: [ChartsModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySoldGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
