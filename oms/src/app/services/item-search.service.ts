import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ItemSearchService {
  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get("/api/items/list");
  }

  getShipNodes() {
    return this.http.get("/api/shipnodes");
  }

  postSearchQuery(form) {
    return this.http.post("/api/items/search", form);
  }

  postViewDetails(form) {
    return this.http.post("/api/items/details", form);
  }
}
