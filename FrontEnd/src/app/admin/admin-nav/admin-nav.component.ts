import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { IUser } from '../../Interfaces/user.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.scss'
})
export class AdminNavComponent {

  constructor(public Uservice:UserService,private _router: Router) { }

  userObj?:IUser;

  ngOnInit(): void {
    if(this.Uservice.subject_curr_user$.value.id==0){
      this.Uservice.getUserData('').pipe(map((res)=>res.data.user)).subscribe(
     data=>{
       this.userObj=data;
       this.Uservice.subject_curr_user$.next(data);
     });
   }
   else{
     this.userObj=this.Uservice.subject_curr_user$.value;
     console.log(this.userObj);
   }

  }
  logout(){
    localStorage.clear();
    this.Uservice.subject_curr_user$.next(this.Uservice.subject_curr_userClear$.value);
    console.log(this.Uservice.subject_curr_user$.value);
    this._router.navigate(['login']);
  }

}
