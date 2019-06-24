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
import { OrderAgentComponent } from "./components/order-agent/order-agent.component";
import { ViewComponent } from "./components/view/view.component";
import { OrderUpdateComponent } from "./components/order-update/order-update.component";
import { LoginComponent } from "./components/login/login.component";
import { OrderComponent } from "./components/order/order.component";
import { OrderCreateComponent } from "./components/order-create/order-create.component";
import { OrderSearchComponent } from "./components/order-search/order-search.component";
import { ItemSearchComponent } from "./components/item/item-search/item-search.component";
import { CreateSupplyComponent } from "./components/item/create-supply/create-supply.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderComponent,
    OrderCreateComponent,
    OrderAgentComponent,
    OrderSearchComponent,
    ViewComponent,
    OrderUpdateComponent,
    ItemSearchComponent,
    CreateSupplyComponent
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

    RouterModule.forRoot([
      { path: "", component: LoginComponent },
      { path: "order", component: OrderComponent },
      { path: "order/create", component: OrderCreateComponent },
      { path: "order-agent", component: OrderAgentComponent },
      { path: "order/search", component: OrderSearchComponent },
      { path: "order/view/:orderID", component: ViewComponent },
      { path: "order/update/:orderID", component: OrderUpdateComponent },
      { path: "item/search", component: ItemSearchComponent },
      { path: "item/create-supply", component: CreateSupplyComponent }
    ])
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
