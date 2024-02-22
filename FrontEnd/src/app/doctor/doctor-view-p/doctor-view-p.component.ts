import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../Interfaces/user.interface';
import { IMeasurement } from '../../Interfaces/measurements.interface';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MeasurementsService } from '../../services/measurements.service';
import { map } from 'rxjs';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-doctor-view-p',
  templateUrl: './doctor-view-p.component.html',
  styleUrl: './doctor-view-p.component.scss',
})
export class DoctorViewPComponent {
  mychart: any;
  userForm: FormGroup = new FormGroup([]);
  submitted = false;
  submitted2 = false;
  myPatient?: IUser;
  mediData?: IMeasurement[];
  carbValues?: number[];
  glucoseValues?: number[];
  avg?:any;
  bg?: number[];
  ca?: number[];
  d?: string[];


  graph: any;

  id?: number | null;

  constructor(
    private _router: Router,
    public Uservice: UserService,
    public mService: MeasurementsService
  ) {
    this.id = Number(localStorage.getItem('getID')) ?? null;
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      startAt: new FormControl('', [Validators.required]),
      endAt: new FormControl('', [Validators.required]),
    });

    this.Uservice.getUserData(Number(this.id)).pipe(map((res)=>res.data.user)).subscribe((data) => {
      this.myPatient = data;
    });
  }

  // convenience getter for easy access to form fields
  get startAt() {
    return this.userForm.get('startAt');
  }

  get endAt() {
    return this.userForm.get('endAt');
  }

  doctorConsultP(id: number) {
    console.log(id);
    sessionStorage.setItem('getID', String(id));
    this._router.navigate(['/doctorConsultP']);
  }

  Search(id: number) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
  }

    let Obj={id:'',startAt:'',endAt:''};
    Obj['id']=String(this.id) ?? '';
    Obj['startAt']=this.startAt?.value;
    Obj['endAt']=this.endAt?.value;

    console.log(Obj);
    const datePipe = new DatePipe('en-US');
    this.mService
      .getMeasurementsData(Obj).pipe(map((res)=>res.data.patientMeasurements))
      .subscribe((data1) => {
        this.mediData = data1;
        this.bg = data1.map((data1) => data1.bloodGlucoseLevel);
        this.ca = data1.map((data1) => data1.carbIntake);
        this.d = data1.map((data1) =>
          datePipe.transform(data1.measurementDate, 'EEEE, MMMM d') ?? ''
        );
        this.mychart = new Chart('myChart', {
          type: 'line',
          data: {
            labels: this.d, //['October','November','December'],v
            datasets: [
              {
                label: ' Glucose level ',
                data: this.bg, //[12, 19, 3], {this.mediData[i].carbIntake,} this.mediData.map(m=>m.bloodGlucoseLevel)
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1,
              },
              {
                label: 'Carbonates level ',
                data: this.ca, //[12, 19, 3], {this.mediData[i].carbIntake,} this.mediData.map(m=>m.carbIntake)
                backgroundColor: ['rgba(150, 39, 12, 0.2)'],
                borderColor: ['rgba(150, 39, 12, 1)'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              yAxis:
                {
                  display: true,
                  beginAtZero: true,
                  ticks: {
                    stepSize: 20,
                  },
                },
            },
          },
        });



    this.mService.averageDataPatient(Obj).pipe(map((res)=>res.data)).subscribe((data2) => {
      this.avg=data2;
      this.glucoseValues = data2.avgBloodGlucoseLevel;
      this.carbValues = data2.avgCarbIntake;

      ////////////////////////////////////chart2 ,with avg data as today
      this.graph = {
        data: [
          {
            x: [...this.d ?? [], datePipe.transform(new Date(), 'EEEE, MMMM d')],
            y: [...this.bg ?? [],this.glucoseValues,],
            type: 'scatter',
            mode: 'markers',
            marker: { color: 'red' },
          },
          {
            x: [...this.d ?? [],datePipe.transform(new Date(), 'EEEE, MMMM d')],
            y: [...this.ca ?? [],this.carbValues],
            type: 'scatter',
            mode: 'markers',
            marker: { color: 'blue' },
          },
        ],
        layout: { title: 'Glugose red, carbonates blue' },
      };
    });

      this.submitted2 = true;
    });

    //alert("show measurements complete");
  }
}
