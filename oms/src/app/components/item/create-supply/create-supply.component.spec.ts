import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";

import { CreateSupplyComponent } from "./create-supply.component";
import { Component } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { MatTableModule } from "@angular/material";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

describe("CreateSupplyComponent", () => {
  let component: CreateSupplyComponent;
  let fixture: ComponentFixture<CreateSupplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSupplyComponent],
      imports: [
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
