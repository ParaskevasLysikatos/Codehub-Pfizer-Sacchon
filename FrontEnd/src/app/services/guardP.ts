import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class FrontEndGuardP implements CanActivate {
  userRoleP = '3';
  constructor(private router: Router) {}
  canActivate() {
    if (this.userRoleP === localStorage.getItem('LoginRole')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      window.alert("You don't have permission to view this page");

      return false;
    }
  }
}
