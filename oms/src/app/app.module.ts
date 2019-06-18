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
import { SearchComponent } from "./components/search/search.component";
import { ViewComponent } from "./components/view/view.component";
import { OrderUpdateComponent } from "./components/order-update/order-update.component";
import { LoginComponent } from "./components/login/login.component";
import { OrderComponent } from "./components/order/order.component";
import { OrderCreateComponent } from "./components/order-create/order-create.component";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderComponent,
    OrderCreateComponent,
    OrderAgentComponent,
    SearchComponent,
    ViewComponent,
    OrderUpdateComponent
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
    RouterModule.forRoot([
      { path: "", component: LoginComponent },
      { path: "order", component: OrderComponent },
      { path: "order/create", component: OrderCreateComponent },
      { path: "order-agent", component: OrderAgentComponent },
      { path: "order/search", component: SearchComponent },
      { path: "order/view/:orderID", component: ViewComponent },
      { path: "order/update/:orderID", component: OrderUpdateComponent }
    ])
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
