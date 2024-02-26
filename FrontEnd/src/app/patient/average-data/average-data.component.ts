import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMeasurement } from '../../Interfaces/measurements.interface';
import { Router } from '@angular/router';
import { MeasurementsService } from '../../services/measurements.service';
import { map } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-average-data',
  templateUrl: './average-data.component.html',
  styleUrl: './average-data.component.scss'
})
export class AverageDataComponent {

  form: FormGroup=new FormGroup([]);
  mediData?: any;
  submitted = false;

  constructor(public data:MeasurementsService,private router: Router,private Uservice:UserService) { }

  ngOnInit(): void {
    this.form=new FormGroup({
      amka:new FormControl(this.Uservice.subject_curr_user$.value.amka, [Validators.required, Validators.minLength(9),Validators.maxLength(9)]),
      startAt:new FormControl(),
      endAt: new FormControl()
  });
}
// convenience getter for easy access to form fields
get amka() {
  return this.form.get('amka');
}

get startAt() {
  return this.form.get('startAt');
}

get endAt() {
  return this.form.get('endAt');
}

Search() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.form.invalid) {
      return;
  }


console.log(this.form.value);
 this.data.averageDataPatient(this.form.value).pipe(map((res)=>res.data)).subscribe(
    data2=>{
      this.mediData=data2;
      alert("show measurements complete");
    },
   error=> alert("error"+error.error)
 );

}

}
