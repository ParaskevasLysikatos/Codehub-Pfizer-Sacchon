import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditConClass } from 'src/app/classes/editConClass';
import { GetConsultationsClass } from 'src/app/classes/getConsultationsClass';
import { PatientRealClass } from 'src/app/classes/patientRealClass';
import { UserService } from 'src/app/services/user.service';
import 'jquery';
@Component({
  selector: 'app-doctor-consult-p',
  templateUrl: './doctor-consult-p.component.html',
  styleUrls: ['./doctor-consult-p.component.scss']
})
export class DoctorConsultPComponent implements OnInit {
  myPatient:PatientRealClass;
  myCons:GetConsultationsClass[];
  myConsObj:GetConsultationsClass[];
  constructor(private _router: Router,public Uservice:UserService) { }

  ngOnInit(){
    this.Uservice.currentId.userID=parseInt(sessionStorage.getItem("getID"));
      this.Uservice.get1User(this.Uservice.currentId).subscribe(
        data=>{
          this.myPatient=data;
            }
      );

     
      this.Uservice.getCon(parseInt(sessionStorage.getItem("getID"))).subscribe(
        data1=>{
          this.myCons=data1;
            }
      );

  }

 doctorViewP(id:Number){
  this.Uservice.currentId.userID=id;
  console.log(id);
  console.log(this.Uservice.currentId.userID);
  sessionStorage.setItem("getID",String(id));
  this._router.navigate(['/doctorViewP']);
 }

 createCon(){
  this.Uservice.currentCon.patientID=parseInt(sessionStorage.getItem("getID"));
  this.Uservice.currentCon.consultationMsg=(<HTMLInputElement> document.getElementById('myConsult')).value;
  this.Uservice.createCon(this.Uservice.currentCon).subscribe();
  window.location.reload();

 }


get1Con(cID:number){
  this.Uservice.get1Con(cID).subscribe(
    data2=>{
      this.myConsObj=data2;
      
        }
  );
 
}

 editCon(cID:number,pID:number){
  this.Uservice.editCurrentCon.consultationID=cID;
  this.Uservice.editCurrentCon.patientID=pID;
  this.Uservice.editCurrentCon.consultationMsg=(<HTMLInputElement>document.getElementById('textE')).value;
  let d= Date.now();
  this.Uservice.editCurrentCon.registerDate=new Date(d).toISOString();
  this.Uservice.editCon(this.Uservice.editCurrentCon).subscribe();
  window.location.reload();

 }

 deleteCon(cID:number){
  this.Uservice.deleteCon(cID).subscribe();
  window.location.reload();
 }

}
