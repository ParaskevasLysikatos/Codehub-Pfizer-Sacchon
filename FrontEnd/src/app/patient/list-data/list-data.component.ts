import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMeasurement } from '../../Interfaces/measurements.interface';
import { MeasurementsService } from '../../services/measurements.service';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrl: './list-data.component.scss'
})
export class ListDataComponent {
  fa_trash = faTrash;

  form: FormGroup = new FormGroup([]);
  modalform: FormGroup = new FormGroup([]);

  tempDate={id:localStorage.getItem('id'),startAt:this.formatDate(new Date()),endAt:this.formatDate(new Date)};

  mediData: IMeasurement[]=[];
  mediDataObj?: IMeasurement;

  submitted = false;
  myGetDate?:string;

  carbIntake: number[] = [];
  bloodGlucoseLevel:number[] = [];
  measurementDate: string[] = [];

  constructor(public data:MeasurementsService) {
    this.form = new FormGroup({
      startAt:new FormControl('', [Validators.required]),
      endAt:new FormControl('', [Validators.required])
    });

    this.modalform = new FormGroup({
      editD:new FormControl('', [Validators.required]),
      carbModal:new FormControl('', [Validators.required]),
      gluModal:new FormControl('', [Validators.required])
    });
  }

   // convenience getter for easy access to form fields
   get startAt() {
    return this.form.get('startAt');
  }

  get endAt() {
    return this.form.get('endAt');
  }

  get editD() {
    return this.modalform.get('editD');
  }

  get carbModal() {
    return this.modalform.get('carbModal');
  }

  get gluModal() {
    return this.modalform.get('gluModal');
  }


  ngOnInit(): void {
    this.data.getMeasurementsData(this.tempDate).pipe(map((res)=> res.data.patientMeasuremnts)).subscribe(
      medi => {this.mediData = medi; this.fillData(this.mediData);});
}


Search() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.form.invalid) {
      return;
  }

  this.tempDate['startAt']=this.startAt?.value;
  this.tempDate['endAt']=this.endAt?.value;
  console.log(this.tempDate);
  this.ngOnInit();
  alert("show measurements complete");
}

fillData(medi:IMeasurement[]){
  if(medi === undefined || medi.length == 0){
      this.carbIntake = [];
      this.bloodGlucoseLevel = [];
      this.measurementDate = [];
  }else{
    const datePipe = new DatePipe('en-US');
    medi.forEach((value) => {
    this.carbIntake.push(value.carbIntake),
    this.bloodGlucoseLevel.push(value.bloodGlucoseLevel),
    this.measurementDate.push(datePipe.transform(value.measurementDate, 'EEEE, MMMM d') ?? '');
    }
    );
  }

  this.carbIntake = [...this.carbIntake]
  this.bloodGlucoseLevel = [...this.bloodGlucoseLevel]
  this.measurementDate = [...this.measurementDate]
  console.log( this.carbIntake);
  console.log( this.bloodGlucoseLevel);
  console.log( this.measurementDate);
}


getData(id:number){
  console.log(id);
  this.data.get1M(id).subscribe(
    data1=>{
      this.mediDataObj=data1;
    this.myGetDate=this.mediDataObj.measurementDate?.split(' ')[0];
    console.log(this.myGetDate);
  }
  );
}

updateData(id:number){

    let updateDataObj={id:id,measurementDate:this.editD?.value,bloodGlucoseLevel:this.gluModal?.value,carbIntake:this.carbModal?.value};
    console.log(updateDataObj);
    this.data.updateMediData(updateDataObj).subscribe(
      (response) => console.log(response),
      (error) => console.log(error));
      window.location.reload();
}

 deleteData(id:number){
  console.log(id);
  this.data.removeMedi(id).subscribe(
    res=>{
      alert("delete success");
    this.ngOnInit();
    },
    error=>{
      alert("delete failed");
    }
  );

 }


 // format date to yyyy-mm-dd
 formatDate(currentDate:Date) {
  const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
const day = String(currentDate.getDate()).padStart(2, '0');

// Format the date as "YYYY-MM-DD"
const formattedDate = `${year}-${month}-${day}`;

return formattedDate;
}


}
