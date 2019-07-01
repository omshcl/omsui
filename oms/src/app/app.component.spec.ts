import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { APP_BASE_HREF } from "@angular/common";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterModule,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: "/" }]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'oms'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("oms");
  });

  // it("should render title in a h1 tag", () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector("h1").textContent).toContain(
  //     "Welcome to oms!"
  //   );
  // });
});
