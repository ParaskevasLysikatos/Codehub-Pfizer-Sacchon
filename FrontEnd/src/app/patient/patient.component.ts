import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { IUser } from '../Interfaces/user.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent {


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

}
