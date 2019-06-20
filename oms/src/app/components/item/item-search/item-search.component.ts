import { Component, OnInit } from "@angular/core";
import { ItemSearchService } from "../../../services/item-search.service";

@Component({
  selector: "app-item-search",
  templateUrl: "./item-search.component.html",
  styleUrls: ["./item-search.component.css"]
})
export class ItemSearchComponent implements OnInit {
  getItemsResponse;
  public itemList: Array<Item> = [];
  selectedItems;
  constructor(private _itemSearchService: ItemSearchService) {}

  ngOnInit() {
    this._itemSearchService.getItems().subscribe(response => {
      this.getItemsResponse = response;
      for (let curItem of this.getItemsResponse) {
        let newItem: Item;
        newItem.itemid = curItem.itemid;
        newItem.shortdescription = curItem.shortdescription;
        this.itemList.push(newItem);
      }
    });
  }
}

export interface Item {
  itemid: number;
  shortdescription: string;
}
