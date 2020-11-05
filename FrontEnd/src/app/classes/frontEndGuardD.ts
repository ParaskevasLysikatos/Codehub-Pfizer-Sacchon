import {CanActivate,Router} from "@angular/router";
import { Injectable } from '@angular/core';
@Injectable()
export class FrontEndGuardD implements CanActivate{
   
     userRoleD="ROLE_DOCTOR";
     constructor(private router: Router){}
    canActivate() {
       if(this.userRoleD===sessionStorage.getItem('LoginRole'))
       {return true;}
        else  {this.router.navigate(['/login']);
        window.alert("You don't have permission to view this page"); 
        
         return false;}
      }

}