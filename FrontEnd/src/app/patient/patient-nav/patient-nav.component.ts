import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-nav',
  templateUrl: './patient-nav.component.html',
  styleUrl: './patient-nav.component.scss'
})
export class PatientNavComponent {

  constructor(private router: Router) { }

logout(){
  localStorage.clear();
  this.router.navigate(['login']);
}


}
