import {CanActivate,Router} from "@angular/router";
import { Injectable } from '@angular/core';
@Injectable()
export class FrontEndGuardP implements CanActivate{
 
     userRoleP="ROLE_PATIENT";
     constructor(private router: Router){}
    canActivate() {
       if(this.userRoleP===sessionStorage.getItem('LoginRole'))
       {return true;}
       else {this.router.navigate(['/login']);
       window.alert("You don't have permission to view this page"); 
       
        return false;}
      }

}