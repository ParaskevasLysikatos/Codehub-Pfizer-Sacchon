import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Measurements } from 'src/app/classes/measurements';
import { MeasurementsService } from 'src/app/services/measurements.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'codehub-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss']
})
export class ListDataComponent implements OnInit {
  form: FormGroup;
  mediData: Measurements[];
  mediDataObj: Measurements;

  mediDataId:any;
  submitted = false;
  myGetDate:string;
 
  carbIntake: number[] = [];
  bloodGlucoseLevel:number[] = [];
  measurementDate: string[] = [];

  constructor(private formBuilder: FormBuilder,
    public data:MeasurementsService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.data.getMeasurementsData(this.data.currentStEndDate).subscribe(
      medi => {this.mediData = medi, this.fillData(this.mediData)});
    this.form = this.formBuilder.group({
      fromDate: ['', Validators.required],
      untilDate: ['', Validators.required],
  });
  
}
fillData(medi){
  if(medi === undefined || medi.length == 0){
      this.carbIntake = [];
      this.bloodGlucoseLevel = [];
      this.measurementDate = [];  
  }else{

    const datePipe = new DatePipe('en-US');
    medi.forEach((value) => {
    this.carbIntake.push(value.carbIntake),
    this.bloodGlucoseLevel.push(value.bloodGlucoseLevel),
    this.measurementDate.push(datePipe.transform(value.measurementDate, 'EEEE, MMMM d'));
    }
    )
  }  

  this.carbIntake = [...this.carbIntake]
  this.bloodGlucoseLevel = [...this.bloodGlucoseLevel]
  this.measurementDate = [...this.measurementDate]

}

  // convenience getter for easy access to form fields
 get f() { return this.form.controls; }

 Search() {
     this.submitted = true;

     // stop here if form is invalid
     if (this.form.invalid) {
         return;
     }
     let st =(<HTMLInputElement> document.getElementById('from')).value;
    this.data.currentStEndDate.startAt = new Date(st).toISOString();

    let ed= (<HTMLInputElement>document.getElementById('until')).value;
    this.data.currentStEndDate.endAt = new Date(ed).toISOString();

    console.log(st);
    console.log(ed);
     this.data.getMeasurementsData(this.data.currentStEndDate).subscribe(
        data1=>{
          this.mediData=data1;
        }
     )
     alert("show measurements complete");
 }
 
getData(id:number){
  console.log(id);
  this.data.mID.measurementID=id;
  console.log(this.data.mID.measurementID);
  this.data.get1M(id).subscribe(
    data1=>{
      this.mediDataObj=data1;
 
  var date_ob = new Date(this.mediDataObj.measurementDate);
  // year as 4 digits (YYYY)
var year = date_ob.getFullYear();

// month as 2 digits (MM)
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// date as 2 digits (DD)
var date = ("0" + date_ob.getDate()).slice(-2);
console.log("Date as YYYY-MM-DD Format: " + year + "-" + month + "-" + date);
var myDate=year + "-" + month + "-" + date;
    this.myGetDate=myDate;
  }
  );
}

updateData(id:number){

  let d =(<HTMLInputElement> document.getElementById('editD')).value;
    this.data.currentMeasurements.measurementDate = new Date(d).toISOString();

    let c =(<HTMLInputElement> document.getElementById('carbModal')).value;
    let g =(<HTMLInputElement> document.getElementById('gluModal')).value;
    
    console.log(d);
    this.data.currentMeasurements.measurementID=id;
    this.data.currentMeasurements.carbIntake=parseInt(c);
    this.data.currentMeasurements.bloodGlucoseLevel=parseInt(g);
    this.data.updateMediData(this.data.currentMeasurements).subscribe(
      (response) => console.log(response),
      (error) => console.log(error));
      window.location.reload();
 
  
}

 deleteData(id:number){
  console.log(id);
  this.data.mID.measurementID=id;
  console.log(this.data.mID.measurementID);
  this.data.removeMedi(id).subscribe();
  alert("delete success");
  window.location.reload();
 }
}
