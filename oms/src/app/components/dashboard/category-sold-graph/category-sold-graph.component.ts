import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from "@angular/core";
import { OrderSearchService } from "src/app/services/order-search.service";
import { ItemSearchService } from "src/app/services/item-search.service";
import { BaseChartDirective } from "ng2-charts";
import * as pluginDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: "app-category-sold-graph",
  templateUrl: "./category-sold-graph.component.html",
  styleUrls: ["./category-sold-graph.component.css"]
})
export class CategorySoldGraphComponent implements OnChanges {
  getItemsResponse;
  getOrdersResponse;
  itemList: Array<Item> = [];
  @Input() responseData: any;
  categoryMap: Map<string, number> = new Map<string, number>();

  pieChartData: Array<number> = null;
  pieChartLabels: Array<string> = [];
  pieChartOptions = {
    title: {
      text: "Total Sales: ",
      display: true
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          let total = 0;
          for (let curVal of ctx.chart.data.datasets[0].data) total += curVal;
          let percent = ((value / total) * 100).toFixed(2);
          return [label, "$" + value, "%" + percent];
        }
      }
    }
  };
  pieChartPlugins = [pluginDataLabels];
  chartType = "pie";

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;

  constructor(
    private _OrderSearchService: OrderSearchService,
    private _itemSearchService: ItemSearchService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    let change = changes["responseData"];
    let Response = change.currentValue;
    console.log(Response.itemsData);
    if (Response.itemsData) {
      let ItemsResponse = Response.itemsData;
      for (let curItem of ItemsResponse) {
        var newItem = {} as Item;
        newItem.itemid = curItem.itemid;
        newItem.shortdescription = curItem.shortdescription;
        newItem.category = curItem.category;
        this.itemList = [...this.itemList, newItem];
      }

      let OrdersResponse = Response.ordersData;
      for (let order of OrdersResponse) {
        for (let item of order.items) {
          let curCategory = this.getCategory(item.itemid);
          if (this.categoryMap.has(curCategory)) {
            //add total to cur value
            let subTotal = item.price * item.quantity;
            let curValue = this.categoryMap.get(curCategory);
            curValue += subTotal;
            this.categoryMap.set(curCategory, curValue);
          } else {
            //make new entry in map
            let subTotal = item.price * item.quantity;
            this.categoryMap.set(curCategory, subTotal);
          }
        }
      }
      this.pieChartData = [];
      let keySet = this.categoryMap.keys();
      let totalSales = 0;
      for (let key of keySet) {
        this.pieChartLabels.push(key);
        this.pieChartData.push(this.categoryMap.get(key));
        totalSales += this.categoryMap.get(key);
      }
      this.pieChartOptions.title.text = "Total Sales: $" + totalSales;
    }
  }

  getCategory(itemID) {
    return this.itemList.find(x => x.itemid == itemID).category;
  }
}

export interface Item {
  itemid: number;
  shortdescription: string;
  category: string;
}
