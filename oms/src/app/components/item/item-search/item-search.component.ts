import { Component, OnInit, ViewChild } from "@angular/core";
import { ItemSearchService } from "../../../services/item-search.service";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

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
  public shipNodeList: Array<string> = [];
  selectedItems = [];
  selectedShipNodes = [];
  displayedColumns = [
    "shipnode",
    "shortdescription",
    "type",
    "productclass",
    "quantity"
  ];
  elementData: Element[] = [];
  dataSource;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

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
    this.elementData = [];
    let form = {
      items: this.selectedItems,
      shipnodes: this.selectedShipNodes
    };
    this._itemSearchService.postSearchQuery(form).subscribe(response => {
      this.getSearchResponse = response;
      console.log(this.getSearchResponse);
      for (let itemsupply of this.getSearchResponse) {
        this.elementData.push({
          shipnode: itemsupply.shipnode,
          shortdescription: this.itemList.find(
            x => x.itemid == itemsupply.itemid
          ).shortdescription,
          quantity: itemsupply.quantity,
          productclass: itemsupply.productclass,
          type: itemsupply.type
        });
      }
      this.dataSource = new MatTableDataSource(this.elementData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

export interface Item {
  itemid: number;
  shortdescription: string;
}

export interface Element {
  shipnode: any;
  shortdescription: any;
  quantity: any;
  productclass: any; //new or used
  type: any; //onhand or pipeline
}
