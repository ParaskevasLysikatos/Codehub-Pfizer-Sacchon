import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserClass } from 'src/app/classes/UserClass';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  userForm:FormGroup;
  submitted = false;
  genders = ['NA','FEMALE', 'MALE']
  userObj:UserClass;
  

  constructor(private formBuilder: FormBuilder,private _router: Router,public Uservice:UserService) { }
  
  ngOnInit() {
    

    this.getUserData();

    this.userForm= this.formBuilder.group({
      firstName:['', Validators.minLength(3)],
      lastName: ['', Validators.minLength(3)],
      gender:['', Validators.minLength(1)],
      password: ['', [ Validators.minLength(6)]],

      confirmPassword:['', Validators.minLength(6)],

      address: ['',Validators.minLength(3)],
      mobile:['', [ Validators.minLength(10), Validators.maxLength(10)]],
      phone:['', [ Validators.minLength(10)]]
      
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  getUserData(){
  this.Uservice.getUserData().subscribe(
    data=>{
      this.userObj=data;
        }
  );
      }


    editPatient(){

    this.submitted = true;
    console.log("pressed");
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
    
    
    this.Uservice.currentUser.first_name =(<HTMLInputElement> document.getElementById('firstName')).value.replace(/\s/g, "");
    this.Uservice.currentUser.last_name=(<HTMLInputElement>document.getElementById('lastName')).value.replace(/\s/g, "");
    this.Uservice.currentUser.address=(<HTMLInputElement>document.getElementById('address')).value.replace(/\s/g, "");
    this.Uservice.currentUser.password=(<HTMLInputElement>document.getElementById('password')).value.replace(/\s/g, "");
    this.Uservice.currentUser.mobile_phone_number=parseInt( (<HTMLInputElement>document.getElementById('mobile')).value.replace(/\s/g, ""));
    this.Uservice.currentUser.phone_number=parseInt( (<HTMLInputElement>document.getElementById('phone')).value.replace(/\s/g, ""));
    this.Uservice.currentUser.accountType=2;


    this.Uservice.currentUser.amka=parseInt(sessionStorage.getItem("amka"));
    this.Uservice.currentUser.email=String(sessionStorage.getItem("email")).replace(/\s/g, "");

    this.Uservice.currentLogin.userPassword=this.Uservice.currentUser.password;
    this.Uservice.currentLogin.userEmail=this.Uservice.currentUser.email;
    
    if((<HTMLInputElement>document.getElementById('gender')).value=="MALE")
    {
      this.Uservice.currentUser.gender=1;
    }else if((<HTMLInputElement>document.getElementById('gender')).value=="FEMALE")
     {this.Uservice.currentUser.gender=2;}
     else {this.Uservice.currentUser.gender=0;}
     
   this.Uservice.editUserData(this.Uservice.currentUser).subscribe(
     (data:UserClass)=>{
        
      }

   );
   sessionStorage.setItem("credentials",this.Uservice.currentLogin.userEmail + ":" + this.Uservice.currentLogin.userPassword);
   window.location.reload();


  }


  deletePatient(){
    this.Uservice.deleteUser().subscribe();
    alert("delete user success");
    this._router.navigate(['/login']);

  }
 

}
