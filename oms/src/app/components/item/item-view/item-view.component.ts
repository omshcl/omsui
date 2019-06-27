import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ItemSearchService } from "src/app/services/item-search.service";
import { MatTableDataSource, MatSort } from "@angular/material";

@Component({
  selector: "app-item-view",
  templateUrl: "./item-view.component.html",
  styleUrls: ["./item-view.component.css"]
})
export class ItemViewComponent implements OnInit {
  locationname;
  itemid;
  type;
  productclass;
  viewResponse;
  getInfo;

  name = "Angular 5";
  displayedColumns = ["itemfield", "itemdetail"];
  dataSource;
  itemdescription: ItemDescription[] = [];
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private _itemSearchService: ItemSearchService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // (+) before `params.get()` turns the string into a number
      this.locationname = params.get("locationname");
      this.itemid = params.get("itemid");
      this.type = params.get("type");
      this.productclass = params.get("productclass");
      let form = {
        locationname: this.locationname,
        itemid: this.itemid,
        type: this.type,
        productclass: this.productclass
      };

      this._itemSearchService.postViewDetails(form).subscribe(response => {
        this.viewResponse = response;
        for (let key in this.viewResponse) {
          this.itemdescription.push({
            itemfield: key,
            itemdetail: this.viewResponse[key]
          });
        }
        this._itemSearchService
          .getItemInfo(this.viewResponse.itemid)
          .subscribe(response => {
            this.viewResponse = response;
            for (let key in this.viewResponse) {
              if (key === "itemid") {
                continue;
              }
              this.itemdescription.push({
                itemfield: key,
                itemdetail: this.viewResponse[key]
              });
            }
            this.dataSource = new MatTableDataSource(this.itemdescription);
            this.dataSource.sort = this.sort;
            console.log(this.itemdescription);
          });
      });
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

export interface ItemDescription {
  itemfield: string;
  itemdetail: string;
}
