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
}
