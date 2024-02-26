import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-nav',
  templateUrl: './patient-nav.component.html',
  styleUrl: './patient-nav.component.scss'
})
export class PatientNavComponent {

  constructor(private router: Router,private Uservice:UserService) { }

logout(){
  this.Uservice.logoutUser().subscribe( (res)=>{
    this.Uservice.subject_curr_user$.next(this.Uservice.subject_curr_userClear$.value);
    console.log( this.Uservice.subject_curr_user$.value);
    localStorage.clear();

    this.router.navigate(['login']);
  });
}


}
