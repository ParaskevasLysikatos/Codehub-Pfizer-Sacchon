import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'codehub-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

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

  ngOnInit(): void {
  }

}
