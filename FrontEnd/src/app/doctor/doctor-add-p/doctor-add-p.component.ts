import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserClass } from 'src/app/classes/UserClass';
import { UserService } from 'src/app/services/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRealClass } from 'src/app/classes/patientRealClass';


@Component({
  selector: 'app-doctor-add-p',
  templateUrl: './doctor-add-p.component.html',
  styleUrls: ['./doctor-add-p.component.scss']
})
export class DoctorAddPComponent implements OnInit {

  freePatientList:PatientRealClass[];
  

  constructor(private _router: Router, public Uservice:UserService) { }

  ngOnInit(){

    this.Uservice.getFreePatients().subscribe(
      data=>{
        this.freePatientList=data;
        
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

  



  addPatient(id:number){
        this.Uservice.currentAssoc.doctor=parseInt(sessionStorage.getItem("id"));
        this.Uservice.currentAssoc.patient=id;
        this.Uservice.addFreePatient(this.Uservice.currentAssoc).subscribe();
      alert("add success");
      window.location.reload();


  }

  
}
