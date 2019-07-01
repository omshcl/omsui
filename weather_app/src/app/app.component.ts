import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather';
  response;
  states: string[] = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];
  state: string = this.states[0];

  constructor(private http: HttpClient) {
  }

  search() {
    this.http.get('https://api.weather.gov/alerts?area='+this.getCode(this.state)).subscribe((resp) => {
      this.response = resp;
    })
  }

  getCode(state: string) {
    switch(state) {
      case "Alabama":
        return "AL";
      case "Alaska":
        return "AK";
      case "Arizona":
        return "AZ";
      case "Arkansas":
        return "AR";
      case "California":
        return "CA";
      case "Colorado":
        return "CO";
      case "Connecticut":
        return "CT";
      case "Delaware":
        return "DE";
      case "District of Columbia":
        return "DC";
      case "Florida":
        return "FL";
      case "Georgia":
        return "GA";
      case "Hawaii":
        return "HI";
      case "Idaho":
        return "ID";
      case "Illinois":
        return "IL";
      case "Indiana":
        return "IN";
      case "Iowa":
        return "IA";
      case "Kansas":
        return "KS";
      case "Kentucky":
        return "KY";
      case "Louisiana":
        return "LA";
      case "Maine":
        return "ME";
      case "Montana":
        return "MT";
      case "Nebraska":
        return "NE";
      case "Nevada":
        return "NV";
      case "New Hampshire":
        return "NH";
      case "New Jersey":
        return "NJ";
      case "New Mexico":
        return "NM";
      case "New York":
        return "NY";
      case "North Carolina":
        return "NC";
      case "North Dakota":
        return "ND";
      case "Ohio":
        return "OH";
      case "Oklahoma":
        return "OK";
      case "Oregon":
        return "OR";
      case "Maryland":
        return "MD";
      case "Massachusetts":
        return "MA";
      case "Michigan":
        return "MI";
      case "Minnesota":
        return "MN";
      case "Mississippi":
        return "MS";
      case "Missouri":
        return "MO";
      case "Pennsylvania":
        return "PA";
      case "Rhode Island":
        return "RI";
      case "South Carolina":
        return "SC";
      case "South Dakota":
        return "SD";
      case "Tennessee":
        return "TN";
      case "Texas":
        return "TX";
      case "Utah":
        return "UT";
      case "Vermont":
        return "VT";
      case "Virginia":
        return "VA";
      case "Washington":
        return "WA";
      case "West Virginia":
        return "WV";
      case "Wisconsin":
        return "WI";
      case "Wyoming":
        return "WY";
      default:
        return "AL";
    }  
  }
}
