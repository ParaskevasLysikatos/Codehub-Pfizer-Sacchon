import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class FrontEndGuardA implements CanActivate {
  userRoleA = '1';
  constructor(private router: Router) {}

  canActivate() {
    if (this.userRoleA === localStorage.getItem('LoginRole')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      window.alert("You don't have permission to view this page");

      return false;
    }
  }
}
