import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from '../user/user';

function emailMatcher(c:AbstractControl): { [key: string]: boolean } | null{
  let emailControl = c.get('email');
  let confirmControl = c.get('confirmEmail');
  if(emailControl.pristine || confirmControl.pristine){
    return null;
  }
  if(emailControl.value === confirmControl.value){
    return null;
  }
  return { 'match' : true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  user: User = new User();

  save() {
    console.log(this.userForm.touched);
    console.log(this.userForm.valid);
    console.log("Saved: " + JSON.stringify(this.userForm.value));
    console.log(this.userForm.get('emailGroup').errors);
    console.log("----------------------------------------");
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    //Instead of using the FormGroup we would be using form formBuilder's group function.
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: [''],
      //Creating nested Form Group
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
        confirmEmail: ['', Validators.required],
      },{validator: emailMatcher}),
      address: ['', Validators.required],
      notification: ['email'],
      // rating:['',ratingRange]
      //calling custom validator which accepts parameter
      rating: ['', ratingRangeWithArgs(1, 5)]
    });

    //watching any particular formControl for any changes.
    this.userForm.get('notification').valueChanges.subscribe(value => console.log(value));

    // this.userForm = new FormGroup({
    //If we need to set any default value to the form fields 
    //then we can pass the value to FormControl contructor
    //like firstName: new FormControl("Arnab")
    // firstName: new FormControl(),
    // lastName: new FormControl(),
    // phoneNumber: new FormControl(),
    // email: new FormControl(),
    // address: new FormControl()
    // });
  }

  setNotification(notifyVia: String): void {
    let phoneControl = this.userForm.get('phoneNumber');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
      //phoneControl.setValidators(Validators.minLength(10));
      //phoneControl.setValidators(Validators.maxLength(10));
    } else {
      phoneControl.clearValidators;
    }
    phoneControl.updateValueAndValidity();
  }

}

function ratingRangeWithArgs(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value != undefined && (isNaN(c.value)) || c.value < min || c.value > max) {
      return { 'range': true };
    }
    return null;
  }
}

function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value != undefined && (isNaN(c.value)) || c.value < 1 || c.value > 5) {
    return { 'range': true };
  }
  return null;
}




