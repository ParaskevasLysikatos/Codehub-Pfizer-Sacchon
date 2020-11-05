import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserClass } from 'src/app/classes/UserClass';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-nav',
  templateUrl: './patient-nav.component.html',
  styleUrls: ['./patient-nav.component.scss']
})
export class PatientNavComponent implements OnInit {

  constructor(public Uservice:UserService,private router: Router) { }
    userObj:UserClass;

  ngOnInit(): void {
    this.Uservice.getUserData().subscribe(
      data=>{
        this.userObj=data;
          }
    );
  }
  logout(){
    sessionStorage.setItem('LoginRole',"");
    this.router.navigate(['login']);
  }
}
