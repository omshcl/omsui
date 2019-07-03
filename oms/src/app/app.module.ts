import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgSelectModule } from "@ng-select/ng-select";
import { ChartsModule } from "ng2-charts";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from "@angular/material";
import { OrderAgentComponent } from "./components/orders/order-agent/order-agent.component";
import { OrderViewComponent } from "./components/orders/order-view/order-view.component";
import { OrderUpdateComponent } from "./components/orders/order-update/order-update.component";
import { LoginComponent } from "./components/login/login.component";
import { OrderComponent } from "./components/orders/order/order.component";
import { OrderCreateComponent } from "./components/orders/order-create/order-create.component";
import { OrderSearchComponent } from "./components/orders/order-search/order-search.component";
import { ItemSearchComponent } from "./components/item/item-search/item-search.component";
import { CreateSupplyComponent } from "./components/item/create-supply/create-supply.component";
import { ItemViewComponent } from "./components/item/item-view/item-view.component";
import { DashboardViewComponent } from "./components/dashboard/dashboard-view/dashboard-view.component";
import { OrderPriceGraphComponent } from "./components/dashboard/order-price-graph/order-price-graph.component";
import { CategorySoldGraphComponent } from "./components/dashboard/category-sold-graph/category-sold-graph.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderComponent,
    OrderCreateComponent,
    OrderAgentComponent,
    OrderSearchComponent,
    OrderViewComponent,
    OrderUpdateComponent,
    ItemSearchComponent,
    CreateSupplyComponent,
    ItemViewComponent,
    DashboardViewComponent,
    OrderPriceGraphComponent,
    CategorySoldGraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    NgSelectModule,
    ChartsModule,

    RouterModule.forRoot([
      { path: "", component: LoginComponent },
      { path: "order", component: OrderComponent },
      { path: "order/create", component: OrderCreateComponent },
      { path: "order-agent", component: OrderAgentComponent },
      { path: "order/search", component: OrderSearchComponent },
      { path: "order/view/:orderID", component: OrderViewComponent },
      { path: "order/update/:orderID", component: OrderUpdateComponent },
      { path: "item/search", component: ItemSearchComponent },
      { path: "item/create-supply", component: CreateSupplyComponent },
      { path: "item/view", component: ItemViewComponent },
      { path: "dashboard", component: DashboardViewComponent }
    ])
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
