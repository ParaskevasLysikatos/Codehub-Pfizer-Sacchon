import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  constructor(private _router: Router) { }

  RegisterNavClick() {
    this._router.navigate(['/register'])
  }

  LoginNavClick() {
    this._router.navigate(['/login'])
  }
  PatientLogin() {
    this._router.navigate(['/patient'])
  }

}
