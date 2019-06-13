import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    Name: ''
    
  
  };

  yes= {
    paper:''
  };
  
 

  
  constructor() { }

  ngOnInit() {

  }



  onSubmit(e) {

    console.log(e.value.user);
    console.log(e.value.yes);
    if(e.value.user == "admin" && e.value.yes == "Admin!123"){
      location.href = "./order"

    } 
    else{
      if(e.value.user == "agent" && e.value.yes == "Agent!123"){
        location.href = "./order-agent"
      }
      else {
        alert("Invalid Login. Check credentials.")
      }
    }
    

  }


}