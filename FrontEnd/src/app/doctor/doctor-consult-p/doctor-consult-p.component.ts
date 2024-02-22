import { IConsultation } from './../../Interfaces/consultation.interface';
import { Component } from '@angular/core';
import { IUser } from '../../Interfaces/user.interface';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs';
import { MeasurementsService } from '../../services/measurements.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-consult-p',
  templateUrl: './doctor-consult-p.component.html',
  styleUrl: './doctor-consult-p.component.scss'
})
export class DoctorConsultPComponent {

  myPatient?:IUser;
  myCons?:IConsultation[];
  myConsObj?:IConsultation;

  formCreate: FormGroup = new FormGroup([]);
  formUpdate: FormGroup = new FormGroup([]);

  submitted = false;
  submitted2 = false;

  patId?:number;
  constructor(private _router: Router,public Uservice:UserService,public mService:MeasurementsService) {
    this.patId=parseInt(localStorage.getItem("getID") ?? '');

    this.formCreate = new FormGroup({
      consultationMsg:new FormControl('', [Validators.required])
    });

    this.formUpdate = new FormGroup({
      consultationMsg:new FormControl('', [Validators.required])
    });
  }

  get consultationMsgC() {
    return this.formCreate.get('consultationMsg');
  }
  get consultationMsgU() {
    return this.formUpdate.get('consultationMsg');
  }

  ngOnInit(){
      this.Uservice.getUserData(this.patId ?? '').pipe(map((res)=>res.data.user)).subscribe(
        data=>{
          this.myPatient=data;
            }
      );

      let Obj={consultation_id:'',user_id:''};
      Obj['user_id']= String(this.patId);

      this.mService.getPatientConsultation(Obj).pipe(map((res)=>res.data.consultations_patient)).subscribe(
        data1=>{
          this.myCons=data1;
          console.log(this.myCons);
            }
      );

      this.submitted = false;
      this.submitted2 = false;
      this.formCreate.reset();

  }

 doctorViewP(id:Number){
  localStorage.setItem("getID",String(id));
  this._router.navigate(['/doctorViewP']);
 }

 createCon(){
  this.submitted = true;

  // stop here if form is invalid
  if (this.formCreate.invalid) {
      return;
  }

  let Obj={consultationMsg:'',user_id:''};
  Obj.consultationMsg=this.consultationMsgC?.value;
  Obj.user_id=String(this.patId);

  this.mService.createCon(Obj).subscribe(
     (res)=>
    {
      alert("consultation message created");
      this.ngOnInit();
    }, error => alert(error.error.message)
  );

 }


get1Con(cID:number){
  let Obj={id:''};
  Obj.id=String(cID);

  this.mService.getPatientConsultation(Obj).pipe(map((res)=>res.data.consultation)).subscribe(
    data2=>{
      this.myConsObj=data2;
        }
  );
}

 editCon(cID:number){
  this.submitted2 = true;

  // stop here if form is invalid
  if (this.formUpdate.invalid) {
      return;
  }

  let Obj={consultationMsg:'',id:'',isRead:0};

  Obj.id=String(cID);
  Obj.consultationMsg=this.consultationMsgU?.value;

  this.mService.editCon(Obj).subscribe(
    (res)=>
    {
      alert("consultation message updated");
      this.ngOnInit();
    }, error => alert(error.error.message)
  );

 }

 deleteCon(cID:number){
  this.mService.deleteCon(cID).subscribe(
    (res)=>
    {
      alert("consultation message deleted");
      this.ngOnInit();
    }, error => alert(error.error.message)
  );
 }

}
