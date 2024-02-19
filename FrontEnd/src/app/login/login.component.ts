import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm:FormGroup = new FormGroup([]);
  submitted = false;
  loginRole?:string;

  constructor(public userS:UserService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      email:new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password:new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  // convenience getter for easy access to form fields
  get email() {
    return this.loginForm.get('email');
 }

 get password() {
  return this.loginForm.get('password');
}

  loginSumbit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.userS.loginUser(this.loginForm.value).subscribe(
        (response)=>{
          console.log(response);
           this.loginRole = response.data.user.accountType;
         // sessionStorage.setItem("unreadConsultations",response.unreadConsultations);
         // console.log("unreadConsultations="+ sessionStorage.getItem("unreadConsultations"));

      localStorage.setItem("token",response.data.token);
      //this.userS.subject_token$.next(response.data.token);
      localStorage.setItem("LoginRole",this.loginRole ?? '');

      localStorage.setItem("amka",String( response.data.user.amka));
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("id", String( response.data.user.id));

      if(this.loginRole === '3')
      {this.router.navigate(['/patient']);}

      else if(this.loginRole === '2')
      {this.router.navigate(['/doctor']);}

      else if(this.loginRole === '1')
      {this.router.navigate(['/admin']);}

      else {
        this.router.navigate(['/login']);
        window.alert("no role found that is valid, wait for admin if you are a new registered doctor");
      }

      },
        (error)=>{window.alert(error.error.message)}
      );
    }

}
