import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private fb: FormBuilder) { }
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      userName : [''],
      password : ['']
    });
  }

}
