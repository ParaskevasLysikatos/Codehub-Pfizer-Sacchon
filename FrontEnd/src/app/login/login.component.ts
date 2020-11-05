import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'codehub-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  submitted = false;
  loginRole:string;
  
  constructor(private formBuilder: FormBuilder,public userS:UserService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      email:['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  loginSumbit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.userS.currentLogin.userEmail = this.loginForm.get('email').value.trim();
      this.userS.currentLogin.userPassword = this.loginForm.get('password').value.trim();

      
      this.userS.loginUser(this.userS.currentLogin).subscribe(
        (response)=>{
          console.log(response); this.loginRole=String(response.role);
          sessionStorage.setItem("unreadConsultations",response.unreadConsultations);
          console.log("unreadConsultations="+ sessionStorage.getItem("unreadConsultations"));
          
      sessionStorage.setItem("credentials",this.userS.currentLogin.userEmail + ":" + this.userS.currentLogin.userPassword);
      sessionStorage.setItem("LoginRole",this.loginRole);
      console.log(this.userS.currentLogin.userEmail);
      console.log(this.userS.currentLogin.userPassword);
      console.log((sessionStorage.getItem("credentials")));
      console.log(btoa(sessionStorage.getItem("credentials")));
      if(this.loginRole ==="ROLE_PATIENT") 
      {this.router.navigate(['/patient']);}

      else if(this.loginRole==="ROLE_DOCTOR")
      {this.router.navigate(['/doctor']);}

      else if(this.loginRole==="ROLE_ADMIN")
      {this.router.navigate(['/admin']);}

      else this.router.navigate(['/login']);
        
          }
        ,(error)=>{window.alert("wrong credentials")}
      );
    }
}