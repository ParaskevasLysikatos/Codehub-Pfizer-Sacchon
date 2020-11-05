import { Component, Input, OnInit } from '@angular/core';
import {Chart} from '../../../../node_modules/chart.js/dist/chart.js';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service.js';
import { PatientRealClass } from 'src/app/classes/patientRealClass.js';
import { MeasurementsService } from 'src/app/services/measurements.service.js';
import { Measurements } from 'src/app/classes/measurements.js';
import { AverageDoctorClass } from 'src/app/classes/averageDoctorClass.js';
import { AverageMeasurements } from 'src/app/classes/averageMeasurements.js';
import { AvgMClass } from 'src/app/classes/avgMClass.js';
import { element } from 'protractor';

@Component({
  selector: 'app-doctor-view-p',
  templateUrl: './doctor-view-p.component.html',
  styleUrls: ['./doctor-view-p.component.scss']
})
export class DoctorViewPComponent implements OnInit {
  chart=[];
  chart2=[];
  userForm:FormGroup;
  submitted = false;
  myPatient:PatientRealClass;
  mediData: Measurements[];
  avg:AvgMClass;
  @Input() carbValues: number[];
  @Input() glucoseValues: number[];

  constructor(private formBuilder: FormBuilder,private _router: Router,public Uservice:UserService,public mService:MeasurementsService) { }

  ngOnInit(): void {
    this.Uservice.currentId.userID=parseInt(sessionStorage.getItem("getID"));
      this.Uservice.get1User(this.Uservice.currentId).subscribe(
        data=>{
          this.myPatient=data;
            }
      )

    

    

  }

  get f() { return this.userForm.controls; }
  
  

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  doctorConsultP(id:number){
    this.Uservice.currentId.userID=id;
    console.log(id);
    console.log(this.Uservice.currentId.userID);
    sessionStorage.setItem("getID",String(id));
    this._router.navigate(['/doctorConsultP']);

  }


  Search(id:number) {
    this.submitted = true;

    // stop here if form is invalid
    
    let st =(<HTMLInputElement> document.getElementById('from')).value;
   this.mService.currentSTD.startAt = new Date(st).toISOString();

   let ed= (<HTMLInputElement>document.getElementById('until')).value;
   this.mService.currentSTD.endAt = new Date(ed).toISOString();
   this.mService.currentSTD.userID=id;
   console.log(st);
   console.log(ed);
    this.mService.getMeasurementsData(this.mService.currentSTD).subscribe(
       data1=>{
         this.mediData=data1;
        
       }
         
       
    );
       
    this.Uservice.currentAD.userID=id;
    this.Uservice.currentAD.startAt=new Date(st).toISOString();
    this.Uservice.currentAD.endAt=new Date(ed).toISOString();
    this.Uservice.getAvgDoctor(this.Uservice.currentAD).subscribe(
      data2=>{
        this.avg=data2;
        this.glucoseValues=data2.avgBloodGlucoseLevel;
        this.carbValues=data2.avgCarbIntake;
        
  
       // var i;
        //for( i=0;i<this.mediData.length;i++)
        this.chart = new Chart('myChart', {
          type: 'line',
          data: {
              labels: [st,ed],  //['October','November','December'],
              datasets: [{
                  label: 'Average glucose,Average carbonates ',
                  data: [this.glucoseValues,this.carbValues],            //[12, 19, 3], {this.mediData[i].carbIntake,}
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)'
                     
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)'
                     
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                        max: 800,
                        stepSize: 20,
                          beginAtZero: true
                      }
                  }]
              }
          }
      });

    }
    )
         ////////////////////////////////////chart2
       
   

    alert("show measurements complete");


}


}
