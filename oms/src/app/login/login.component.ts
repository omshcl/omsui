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
    
    

  }


}