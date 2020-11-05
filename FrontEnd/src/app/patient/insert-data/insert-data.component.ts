import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeasurementsService } from 'src/app/services/measurements.service';

@Component({
  selector: 'codehub-insert-data',
  templateUrl: './insert-data.component.html',
  styleUrls: ['./insert-data.component.scss']
})
export class InsertDataComponent implements OnInit {
  insertform: FormGroup;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder,
    public data:MeasurementsService, private router: Router) { }

  ngOnInit(): void {
    this.insertform = this.formBuilder.group({
      carbIntake: ['', Validators.required],
      bloodGlucoseLevel:['', Validators.required],
     
    });
  }
 

 // convenience getter for easy access to form fields
 get f() { return this.insertform.controls; }

 InsertDataSumbit() {
     this.submitted = true;

     // stop here if form is invalid
     if (this.insertform.invalid) {
         return;
     }
     this.data.addMeasurements.carbIntake= this.insertform.get('carbIntake').value;
     this.data.addMeasurements.bloodGlucoseLevel=this.insertform.get('bloodGlucoseLevel').value;

     this.data.addDataMeasurements(this.data.addMeasurements).subscribe(
      (response) => console.log(response),
          (error) => console.log(error));
         // sessionStorage.setItem("credentials",  this.userS.currentUser.email + ":" + this.userS.currentUser.password)
         // sessionStorage.setItem("modified", "false")
          alert('Your measurment has bees inserted!!');
          this.router.navigate(['listdata']);

 }
  }

