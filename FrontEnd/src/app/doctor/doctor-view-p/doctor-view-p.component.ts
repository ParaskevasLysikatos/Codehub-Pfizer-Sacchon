import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../Interfaces/user.interface';
import { IMeasurement } from '../../Interfaces/measurements.interface';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MeasurementsService } from '../../services/measurements.service';

@Component({
  selector: 'app-doctor-view-p',
  templateUrl: './doctor-view-p.component.html',
  styleUrl: './doctor-view-p.component.scss'
})
export class DoctorViewPComponent {
  mychart:any;
  userForm?:FormGroup;
  submitted = false;
  submitted2 = false;
  myPatient?:IUser;
  mediData?: IMeasurement[];
  avg?:any;
  carbValues?: number[];
  glucoseValues?: number[];
   bg?:number[];
   ca?:number[];
   d?:string[];

  graph:any;

  id?: number | null;

  constructor(private _router: Router,public Uservice:UserService,public mService:MeasurementsService) {
    this.id = Number(localStorage.getItem('getID')) ?? null ;
   }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      carbIntake:new FormControl('', [Validators.required]),
      bloodGlucoseLevel:new FormControl('', [Validators.required])
    });

      this.Uservice.getUserData(this.id).subscribe(
        data=>{
          this.myPatient=data;
            }
      )
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  doctorConsultP(id:number){
    console.log(id);
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
          this.bg=data1.map(data1=>data1.bloodGlucoseLevel);
         this.ca=data1.map(data1=>data1.carbIntake);
         this.d=data1.map(data1=>new Date(parseInt(data1.measurementDate)).toLocaleDateString("en-US"));
         this.mychart = new Chart('myChart', {
          type: 'line',
          data: {
              labels: this.d
                ,  //['October','November','December'],v
              datasets: [{
                  label: ' Glucose level ',
                  data: this.bg,            //[12, 19, 3], {this.mediData[i].carbIntake,} this.mediData.map(m=>m.bloodGlucoseLevel)
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)'


                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)'


                  ],
                  borderWidth: 1
              },{
                label: 'Carbonates level ',
                data: this.ca,            //[12, 19, 3], {this.mediData[i].carbIntake,} this.mediData.map(m=>m.carbIntake)
                backgroundColor: [
                    'rgba(150, 39, 12, 0.2)'


                ],
                borderColor: [
                    'rgba(150, 39, 12, 1)'


                ],
                borderWidth: 1
            }]
          },
          options: {
              scales: {
                xAxes:[ {display:true}],
                  yAxes: [{ display:true,
                      ticks: {

                        stepSize: 20,
                          beginAtZero: true
                      }
                  }]
              }
          }
      });

      this.graph = {
        data: [
            { x:  this.d, y: this.bg, type: 'scatter', mode: 'markers', marker: {color: 'red'} },
            { x:  this.d, y: this.ca, type: 'scatter', mode: 'markers', marker: {color: 'blue'} }
        ],
        layout: { title: 'Glugose red, carbonates blue'}
    };

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
        const datePipe = new DatePipe('en-US');
       // var i;
        //for( i=0;i<this.mediData.length;i++)
       ////////////////////////////////////chart2
});

  this.submitted2 = true;
  //alert("show measurements complete");
}

}
