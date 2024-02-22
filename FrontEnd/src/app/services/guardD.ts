import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class FrontEndGuardD implements CanActivate {
  userRoleD = '2';
  constructor(private router: Router) {}
  canActivate() {
    if (this.userRoleD === localStorage.getItem('LoginRole')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      window.alert("You don't have permission to view this page");

      return false;
    }
  }
}
