import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AverageMeasurements } from 'src/app/classes/averageMeasurements';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'codehub-average-data',
  templateUrl: './average-data.component.html',
  styleUrls: ['./average-data.component.scss']
})
export class AverageDataComponent implements OnInit {
  form: FormGroup;
  mediData: AverageMeasurements;
  submitted = false;

  constructor(public data:UserService,
    private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      amka:['', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]],
      fromDate: [''],
      untilDate: [''],

  });
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
this.data.averageData.startAt = new Date(st).toISOString();

let ed= (<HTMLInputElement>document.getElementById('until')).value;
this.data.averageData.endAt = new Date(ed).toISOString();
let amka=this.data.averageData.amka = this.form.get('amka').value;

console.log(st);
console.log(ed);
console.log(amka);
 this.data.averageDataPatient(this.data.averageData).subscribe(
    data2=>{
      this.mediData=data2;
    }
 )
 alert("show measurements complete");
}

}