import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../services/doctor.service';
import {DoctorClass} from '../classes/doctorClass';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { UserClass } from '../classes/UserClass';
import { PatientRealClass } from '../classes/patientRealClass';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  DocAssocPatientList:PatientRealClass[];

  constructor(public Uservice:UserService,private _router: Router) { }
  ngOnInit(){
   

    this.Uservice.getDocAssocPatients().subscribe(
      data=>{
        this.DocAssocPatientList=data;
          }
    );

  }

  doctorViewP(id:number){
    this.Uservice.currentId.userID=id;
    console.log(id);
    console.log(this.Uservice.currentId.userID);
    sessionStorage.setItem("getID",String(id));
    this._router.navigate(['/doctorViewP']);
  }

  doctorConsultP(id:number){
    this.Uservice.currentId.userID=id;
    console.log(id);
    console.log(this.Uservice.currentId.userID);
    sessionStorage.setItem("getID",String(id));
    this._router.navigate(['/doctorConsultP']);

  }


  
}
