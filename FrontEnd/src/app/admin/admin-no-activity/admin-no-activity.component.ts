import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { FormBuilder, FormControl, FormGroup ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from 'src/app/services/admin.service';
import { DoctorInactive } from 'src/app/classes/doctoInactive';
import { PendingDoctor } from 'src/app/classes/pendingDoctor';


@Component({
  selector: 'app-admin-no-activity',
  templateUrl: './admin-no-activity.component.html',
  styleUrls: ['./admin-no-activity.component.scss']
})
export class AdminNoActivityComponent implements OnInit {
  form: FormGroup;
  mediData: DoctorInactive[];
  pending:PendingDoctor[];

  
    constructor(public admin:AdminService,private formBuilder: FormBuilder,private _router: Router) { }
    
    ngOnInit(): void {
      this.form=this.formBuilder.group({
        userID: ['']
  
    });
      
      this.admin.getPendingDoctor().subscribe(
        data=>{
          this.pending=data;
            }
            )
     
          }
    
    
 
    Search() {
      this.admin.getInactiveDoctor().subscribe(
         data1=>{
           this.mediData=data1;
         }
      )
      alert("Show Inactive Doctors");
  }

Data(){
let userID=this.admin.beDoctor.userID = this.form.get('userID').value;

console.log(userID);
 this.admin.getBeDoctor(this.admin.beDoctor).subscribe(
    data2=>{
      this.pending=data2;
    }
 )
 alert("Doctor Activate");
 window.location.reload();
  }

}
