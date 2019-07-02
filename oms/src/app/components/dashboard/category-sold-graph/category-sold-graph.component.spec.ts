import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySoldGraphComponent } from './category-sold-graph.component';

describe('CategorySoldGraphComponent', () => {
  let component: CategorySoldGraphComponent;
  let fixture: ComponentFixture<CategorySoldGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySoldGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySoldGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
