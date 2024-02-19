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
  this.Uservice.getUserData().pipe(map(res=>res.data.user)).subscribe(
   (data:IUser)=>{
      this.userObj=data;
    
        });
}

}
