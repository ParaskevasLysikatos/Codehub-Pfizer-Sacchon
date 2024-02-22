import { Component } from '@angular/core';
import { IUser } from '../../Interfaces/user.interface';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-doctor-add-p',
  templateUrl: './doctor-add-p.component.html',
  styleUrl: './doctor-add-p.component.scss'
})
export class DoctorAddPComponent {

  freePatientList?:IUser[];


  constructor(private _router: Router, public Uservice:UserService) { }

  ngOnInit(){

    this.Uservice.getDocAssocPatients(2).pipe(map((res)=>res.data.free_patients)).subscribe(
      data=>{
        this.freePatientList=data;
          });
    }

    doctorViewP(id:number){
      localStorage.setItem("getID",String(id));
      this._router.navigate(['/doctorViewP']);

    }

  addPatient(id:number){
    let Obj={doctor_id:'',patient_id:''};
      Obj['doctor_id']= String(localStorage.getItem('id'));
      Obj['patient_id']= String(id);

      this.Uservice.addFreePatient(Obj).subscribe(
        res=>{
          alert("add patient success");
          this.ngOnInit();
        }
        );


  }

}
