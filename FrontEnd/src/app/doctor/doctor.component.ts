import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { IUser } from '../Interfaces/user.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss'
})
export class DoctorComponent {

  DocAssocPatientList?:IUser[];

  constructor(public Uservice:UserService,private _router: Router) { }
  ngOnInit(){

    this.Uservice.getDocAssocPatients(1).pipe(map((res)=>res.data.doctor_with_patients)).subscribe( // with specific doc
      data=>{
        this.DocAssocPatientList=data;
          }
    );

  }

  doctorViewP(id:number){
    console.log(id);
    localStorage.setItem("getID",String(id));
    this._router.navigate(['/doctorViewP']);
  }

  doctorConsultP(id:number){
    console.log(id);
    localStorage.setItem("getID",String(id));
    this._router.navigate(['/doctorConsultP']);
  }

}
