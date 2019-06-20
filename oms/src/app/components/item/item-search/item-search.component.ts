import { Component, OnInit } from "@angular/core";
import { ItemSearchService } from "../../../services/item-search.service";

@Component({
  selector: "app-item-search",
  templateUrl: "./item-search.component.html",
  styleUrls: ["./item-search.component.css"]
})
export class ItemSearchComponent implements OnInit {
  getItemsResponse;
  getShipNodesResponse;
  public itemList: Array<Item> = [];
  public shipNodeList: Array<string> = [];
  selectedItems;
  selectedShipNodes;
  constructor(private _itemSearchService: ItemSearchService) {}

  ngOnInit() {
    this._itemSearchService.getItems().subscribe(response => {
      this.getItemsResponse = response;
      for (let curItem of this.getItemsResponse) {
        var newItem = {} as Item;
        newItem.itemid = curItem.itemid;
        newItem.shortdescription = curItem.shortdescription;
        this.itemList = [...this.itemList, newItem];
      }
      console.log(this.itemList);
    });
    this._itemSearchService.getShipNodes().subscribe(response => {
      this.getShipNodesResponse = response;
      for (let curNode of this.getShipNodesResponse) {
        this.shipNodeList = [...this.shipNodeList, curNode];
      }
      console.log(this.shipNodeList);
    });
    // this.itemList.push({ itemid: 7, shortdescription: "Pixel 3" });
  }

  search() {
    console.log({
      items: this.selectedItems,
      shipnodes: this.selectedShipNodes
    });
  }
}

export interface Item {
  itemid: number;
  shortdescription: string;
}
