import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { OrderComponent } from "../../orders/order/order.component";
import { ItemSearchComponent } from "./item-search.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import {
  MatFormFieldModule,
  MatTableModule,
  MatInputModule,
  MatCardModule,
  MatDividerModule
} from "@angular/material";
import { MatPaginatorModule } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("ItemSearchComponent", () => {
  let component: ItemSearchComponent;
  let fixture: ComponentFixture<ItemSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemSearchComponent, OrderComponent],
      imports: [
        HttpClientTestingModule,
        NgSelectModule,
        FormsModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        RouterTestingModule,
        MatInputModule,
        MatCardModule,
        MatDividerModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`is formempty valid`, async(() => {
    component.selectedShipNodes = [];
    expect(component.formEmpty()).toBeTruthy();
  }));
});
