import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeasurementsService } from '../../services/measurements.service';

@Component({
  selector: 'app-insert-data',
  templateUrl: './insert-data.component.html',
  styleUrl: './insert-data.component.scss'
})
export class InsertDataComponent {

  insertform: FormGroup= new FormGroup([]);
  submitted = false;

  constructor(public data:MeasurementsService, private router: Router) { }

  ngOnInit(): void {
    this.insertform = new FormGroup({
      carbIntake:new FormControl('', [Validators.required]),
      bloodGlucoseLevel:new FormControl('', [Validators.required])
    });
  }


 // convenience getter for easy access to form fields
 get carbIntake() {
  return this.insertform.get('carbIntake');
}

get bloodGlucoseLevel() {
  return this.insertform.get('bloodGlucoseLevel');
}

 InsertDataSumbit() {
     this.submitted = true;

     // stop here if form is invalid
     if (this.insertform.invalid) {
         return;
     }

     this.data.addDataMeasurements(this.insertform.value).subscribe(
      (response) => {
        console.log(response);
        alert('Your measurment has bees inserted!!');
        this.router.navigate(['listdata']);
      },
        (error) => console.log(error));
 }

}
