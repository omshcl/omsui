import { Component, OnInit } from "@angular/core";
import { ItemSearchService } from "../../../services/item-search.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-item-search",
  templateUrl: "./item-search.component.html",
  styleUrls: ["./item-search.component.css"]
})
export class ItemSearchComponent implements OnInit {
  getItemsResponse;
  getShipNodesResponse;
  getSearchResponse;
  public itemList: Array<Item> = [];
  public shipNodeList: Array<ShipNode> = [];
  selectedItems = [];
  selectedShipNodes = [];
  dataSource: Array<ShipNodeItemElement> = [];

  constructor(
    private _itemSearchService: ItemSearchService,
    private router: Router
  ) {}

  ngOnInit() {
    this._itemSearchService.getItems().subscribe(response => {
      this.getItemsResponse = response;
      for (let curItem of this.getItemsResponse) {
        var newItem = {} as Item;
        newItem.itemid = curItem.itemid;
        newItem.shortdescription = curItem.shortdescription;
        newItem.itemdescription = curItem.itemdescription;
        newItem.price = curItem.price;
        this.itemList = [...this.itemList, newItem];
      }
      this.itemList.sort((a, b) =>
        a.shortdescription.localeCompare(b.shortdescription)
      );
      console.log(this.itemList);
    });
    this._itemSearchService.getShipNodes().subscribe(response => {
      this.getShipNodesResponse = response;
      for (let curNode of this.getShipNodesResponse) {
        this.shipNodeList = [...this.shipNodeList, curNode];
      }
      this.shipNodeList.sort((a, b) =>
        a.locationname.localeCompare(b.locationname)
      );
      console.log(this.shipNodeList);
    });
    // this.itemList.push({ itemid: 7, shortdescription: "Pixel 3" });
  }
  onSelectAll(form) {
    if (form == "item") this.selectedItems = this.itemList;
    else this.selectedShipNodes = this.shipNodeList;
  }

  onClearAll(form) {
    if (form == "item") this.selectedItems = [];
    else this.selectedShipNodes = [];
  }

  formEmpty() {
    return this.selectedItems.length == 0 || this.selectedShipNodes.length == 0;
  }

  search() {
    this.dataSource = [];
    let form = {
      items: this.selectedItems,
      shipnodes: this.selectedShipNodes
    };
    this._itemSearchService.postSearchQuery(form).subscribe(response => {
      this.getSearchResponse = response;
      console.log(this.getSearchResponse);
      let curNode = "";
      let curItem = "";
      let itemShortDesc = "";
      let itemDesc = "";
      let itemPrice = 0;
      for (let itemsupply of this.getSearchResponse) {
        //CASE 1: need a new card
        if (itemsupply.itemid != curItem || itemsupply.shipnode != curNode) {
          //update variable values
          curItem = itemsupply.itemid;
          curNode = itemsupply.shipnode;
          itemShortDesc = this.itemList.find(x => x.itemid == itemsupply.itemid)
            .shortdescription;
          itemDesc = this.itemList.find(x => x.itemid == itemsupply.itemid)
            .itemdescription;
          itemPrice = this.itemList.find(x => x.itemid == itemsupply.itemid)
            .price;
          //create new ItemSupplyElement
          let newItemSupplyElement = createItemSupplyElement(
            itemShortDesc,
            itemsupply.type,
            itemsupply.productclass,
            itemsupply.quantity,
            itemPrice
          );
          //create new ShipNodeItemElement
          let newShipNodeItemElement = createShipNodeItemElement(
            curNode,
            itemsupply.itemid,
            itemShortDesc,
            newItemSupplyElement,
            itemDesc
          );
          //push new element onto dataSource
          this.dataSource.push(newShipNodeItemElement);
        }
        //CASE 2: add item row to current card (i.e. last element in dataSource array)
        else {
          //create new ItemSupplyElement
          let newItemSupplyElement = createItemSupplyElement(
            itemShortDesc,
            itemsupply.type,
            itemsupply.productclass,
            itemsupply.quantity,
            itemPrice
          );
          //push new element to the "current" card
          this.dataSource[this.dataSource.length - 1].items.push(
            newItemSupplyElement
          );
        }
      }
      console.log(this.dataSource);
    });
  }

  getAsset(shortdesc) {
    switch (shortdesc) {
      case "Phone": {
        return "assets/icons/pixel.png";
      }
      case "Laptop": {
        return "assets/icons/laptop.png";
      }
      case "Monitor": {
        return "assets/icons/tv.png";
      }
      default: {
        return "assets/icons/default.png";
      }
    }
  }

  viewItemSupply(form) {
    console.log(form);
    this.router.navigate(["/item/view", form]);
  }
}

export interface Item {
  itemid: number;
  shortdescription: string;
  itemdescription: string;
  price: number;
}

export interface ShipNode {
  locationname: string;
}

export interface ItemSupplyElement {
  shortdescription: any;
  type: any; //onhand or pipeline
  productclass: any; //new or used
  quantity: any;
  price: any;
}

export interface ShipNodeItemElement {
  shipnode: any;
  itemid: any;
  shortdescription: any;
  items: ItemSupplyElement[];
  itemdescription: any;
}

function createItemSupplyElement(sdesc, tp, pc, qty, pr) {
  let newISE = {} as ItemSupplyElement;
  newISE.shortdescription = sdesc;
  newISE.type = tp;
  newISE.productclass = pc;
  newISE.quantity = qty;
  newISE.price = pr;
  return newISE;
}

function createShipNodeItemElement(sn, id, sdesc, itms, idesc) {
  let newSNIE = {} as ShipNodeItemElement;
  newSNIE.shipnode = sn;
  newSNIE.itemid = id;
  newSNIE.shortdescription = sdesc;
  newSNIE.items = [];
  newSNIE.items.push(itms);
  newSNIE.itemdescription = idesc;
  return newSNIE;
}
