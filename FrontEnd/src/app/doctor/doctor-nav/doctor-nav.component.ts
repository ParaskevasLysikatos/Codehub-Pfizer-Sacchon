import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { IUser } from '../../Interfaces/user.interface';

@Component({
  selector: 'app-doctor-nav',
  templateUrl: './doctor-nav.component.html',
  styleUrl: './doctor-nav.component.scss'
})
export class DoctorNavComponent {

  constructor(public Uservice:UserService,private _router: Router) { }
  userObj1?:IUser;


  ngOnInit() {
    this.Uservice.getUserData().subscribe(
      data=>{
        this.userObj1=data;
      });
  }

  logout(){
    this.Uservice.logoutUser().subscribe( (res)=>{
      localStorage.clear();
      this._router.navigate(['login']);
    });
  }


}
