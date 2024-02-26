import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { IUser } from '../../Interfaces/user.interface';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-doctor-nav',
  templateUrl: './doctor-nav.component.html',
  styleUrl: './doctor-nav.component.scss'
})
export class DoctorNavComponent {

  constructor(public Uservice:UserService,private _router: Router) { }
  userObj1?:IUser;


  ngOnInit() {
    if(this.Uservice.subject_curr_user$.value.id==0){
       this.Uservice.getUserData('').pipe(map((res)=>res.data.user)).subscribe(
      data=>{
        this.userObj1=data;
        this.Uservice.subject_curr_user$.next(data);
      });
    }
    else{
      this.userObj1=this.Uservice.subject_curr_user$.value;
      console.log(this.userObj1);
    }
  }

  logout(){
    this.Uservice.logoutUser().subscribe( (res)=>{
      localStorage.clear();
      this.Uservice.subject_curr_user$.next(this.Uservice.subject_curr_userClear$.value);
      console.log(this.Uservice.subject_curr_user$.value);
      this._router.navigate(['login']);
    });
  }


}
