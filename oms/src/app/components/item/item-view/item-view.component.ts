import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ItemSearchService } from "src/app/services/item-search.service";

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
      console.log(form);

      this._itemSearchService.postViewDetails(form).subscribe(response => {
        this.viewResponse = response;
        console.log(this.viewResponse);
      });
    });
  }
}
