import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LineComponent } from "./components/line/line.component";
import { HttpClientModule } from "@angular/common/http";
import { PieComponent } from './components/pie/pie.component';
import { BarComponent } from './components/bar/bar.component';

@NgModule({
  declarations: [AppComponent, LineComponent, PieComponent, BarComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
