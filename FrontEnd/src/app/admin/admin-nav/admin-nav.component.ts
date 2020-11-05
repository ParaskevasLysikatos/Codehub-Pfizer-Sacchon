import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserClass } from 'src/app/classes/UserClass';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  constructor(public Uservice:UserService,private _router: Router) { }

  userObj:UserClass;
  ngOnInit(): void {
    this.Uservice.getUserData().subscribe(
      data=>{
        this.userObj=data;
       
          }
    );

  }
  logout(){
    sessionStorage.clear();
    this._router.navigate(['login']);
  }
}
