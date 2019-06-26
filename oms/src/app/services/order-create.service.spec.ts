import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { OrderCreateService } from "./order-create.service";
import { itemPost } from "../models/postItems";

describe("OrderCreateService", () => {
  let service: OrderCreateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderCreateService]
    });

    service = TestBed.get(OrderCreateService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should retreive items list from API via GET", () => {
    const dummyItems: itemPost[] = [
      {
        itemid: 1,
        itemdescription: "black 15 inch Lenovo Laptop",
        shortdescription: "Laptop",
        manufacturername: "Lenovo",
        isreturnable: "true",
        price: 1500,
        category: "Technology",
        subcategory: "Computer",
        unitofmeasure: "Each"
      }
    ];

    service.getItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items).toEqual(dummyItems);
    });

    const request = httpMock.expectOne(`/api/items/list`);
    expect(request.request.method).toBe("GET");
    request.flush(dummyItems);
  });

  // it("should post items list from API via POST", () => {
  //   const dummyItems: itemPost[] = [
  //     {
  //       itemid: 1,
  //       itemdescription: "black 15 inch Lenovo Laptop",
  //       shortdescription: "Laptop",
  //       manufacturername: "Lenovo",
  //       isreturnable: "true",
  //       price: 1500,
  //       category: "Technology",
  //       subcategory: "Computer",
  //       unitofmeasure: "Each"
  //     }
  //   ];

  //   // service.postOrder(dummyItems).subscribe(items => {
  //   //   expect(items.length).toBe(1);
  //   //   expect(items).toEqual(dummyItems);
  //   // });

  //   const request = httpMock.expectOne(`/api/orders/new`);
  //   expect(request.request.method).toBe("POST");
  //   request.flush(dummyItems);
  // });
});
