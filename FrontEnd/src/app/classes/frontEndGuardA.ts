import {CanActivate,Router} from "@angular/router";
import { Injectable } from '@angular/core';
@Injectable()
export class FrontEndGuardA implements CanActivate{
   
     userRoleA="ROLE_ADMIN";
     constructor(private router: Router){}
    
    canActivate() {
       if(this.userRoleA===sessionStorage.getItem('LoginRole'))
       {return true;}
       else  {this.router.navigate(['/login']);
       window.alert("You don't have permission to view this page"); 
       
        return false;}
      }

}