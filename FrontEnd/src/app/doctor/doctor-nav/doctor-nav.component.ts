import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserClass } from 'src/app/classes/UserClass';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-doctor-nav',
  templateUrl: './doctor-nav.component.html',
  styleUrls: ['./doctor-nav.component.scss']
})
export class DoctorNavComponent implements OnInit {

  constructor(public Uservice:UserService,private _router: Router) { }
  userObj1:UserClass;
  
  
  ngOnInit() {
    this.Uservice.getUserData().subscribe(
      data=>{
        this.userObj1=data;
       sessionStorage.setItem("amka",String(this.userObj1?.amka));
        sessionStorage.setItem("email",this.userObj1?.email);
        sessionStorage.setItem("id",data.id);
        
          }
          
    );
    
    
   console.log(parseInt(sessionStorage.getItem("amka"))+" amka");
    console.log(sessionStorage.getItem("email")+" email");
    //console.log(btoa("aaaaaaaaa"));
    console.log(parseInt(sessionStorage.getItem("id"))+" id");
  }

  logout(){
    sessionStorage.clear();
    this._router.navigate(['login']);
  }

}
