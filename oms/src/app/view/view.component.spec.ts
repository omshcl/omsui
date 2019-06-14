import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { viewcomponent } from './view.component';

describe('viewComponent', () => {
  let component: viewcomponent;
  let fixture: ComponentFixture<viewcomponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ viewcomponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(viewcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

