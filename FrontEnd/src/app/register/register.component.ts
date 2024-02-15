import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatchOtherValidator } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  userForm:FormGroup = new FormGroup([]);
  submitted = false;

  roles = {'ROLE_DOCTOR':4, 'ROLE_PATIENT':3}; // doctor is pending, admin exist from db
  genders = {'NA':3,'FEMALE':2, 'MALE':1};
  constructor(public userS:UserService, private router: Router) {

   }


  ngOnInit(): void {
    this.userForm=  new FormGroup({
      first_name:new FormControl('',[Validators.required]),
      last_name:new FormControl('', [Validators.required]),
      address:new FormControl(''),
      email:new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      gender:new FormControl('',[Validators.required]),
      accountType:new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
      password_confirmation:new FormControl('',[ Validators.required,MatchOtherValidator({otherControlFn: () => this.passwordControl})]),
      mobile_phone:new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      home_phone:new FormControl(''),
      amka:new FormControl('',[Validators.required, Validators.minLength(9),Validators.maxLength(9)])
    });

    this.passwordControl.valueChanges.subscribe(() => this.confirmPasswordControl.updateValueAndValidity());
  }


  get first_name() {
    return this.userForm.get('first_name');
 }

  get last_name() {
    return this.userForm.get('last_name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get mobile_phone() {
    return this.userForm.get('mobile_phone');
  }

  get home_phone() {
    return this.userForm.get('home_phone');
  }

  get gender() {
    return this.userForm.get('gender');
  }

  get accountType() {
    return this.userForm.get('accountType');
  }

  get amka() {
    return this.userForm.get('amka');
  }

  get password() {
    return this.userForm.get('password');
  }

  get password_confirmation() {
    return this.userForm.get('password_confirmation');
  }

  get passwordControl(): FormControl {
    return this.userForm?.get('password') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.userForm?.get('password_confirmation') as FormControl;
  }

  RegisterSumbit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.userForm.invalid) {
          return;
      }


      this.userS.registerUser(this.userForm.value).subscribe(
        (response:any) =>
      {
        console.log(response);
        alert('Welcome to Sacchon app!!');
        alert('If you are Doctor yoy should wait for Chief Doctor approvement!!');
        this.router.navigate(['login']);
      },
        (error:any) => {
          console.log(error);
          alert(error);
        }
      )
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
