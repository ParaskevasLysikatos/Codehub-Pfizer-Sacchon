import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';
import { IMeasurement } from '../Interfaces/measurements.interface';
import { map } from 'rxjs';
import { IConsultation } from '../Interfaces/consultation.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  mediData?: IMeasurement[];
  subdoc?: IConsultation[];
  form: FormGroup  = new FormGroup([]);
  form2: FormGroup  = new FormGroup([]);
  submitted = false;
  submitted2 = false;

  constructor(
    public Uservice:UserService,
    public data: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      amka:new FormControl('',[Validators.required]),
      startAt:new FormControl('',[Validators.required]),
      endAt: new FormControl('',[Validators.required]),
    });

    this.form2 = new FormGroup({
      amka:new FormControl('',[Validators.required]),
      startAt:new FormControl('',[Validators.required]),
      endAt: new FormControl('',[Validators.required]),
    });

    this.submitted = false;
    this.submitted2 = false;
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

  get amka2() {
    return this.form2.get('amka');
  }

  get startAt2() {
    return this.form2.get('startAt');
  }

  get endAt2() {
    return this.form2.get('endAt');
  }

  Search() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    let Obj = this.form.value;
    Obj['startAt']=this.startAt?.value + ' 00:00:00';
    Obj['endAt']=this.endAt?.value + ' 00:00:00';

    console.log(this.form.value);

    this.data.dateMeasurement(this.form.value).pipe(map((res)=>res.data.measurement)).subscribe((data1) => {
      this.mediData = data1;
      alert('show measurements complete');
    });
  }

  Search2() {
    this.submitted2 = true;

    // stop here if form is invalid
    if (this.form2.invalid) {
      return;
    }

    console.log(this.form2.value);

    this.data.patPeriodConsultation(this.form2.value).pipe(map((res)=>res.data.pat_consulations)).subscribe((data1) => {
      this.subdoc = data1;
      alert('show measurements complete');
    });

  }

  numberOnly(event:any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  logout() {
    this.Uservice.logoutUser().subscribe( (res)=>{
      localStorage.clear();
      this.Uservice.subject_curr_user$.next(this.Uservice.subject_curr_userClear$.value);
      console.log(this.Uservice.subject_curr_user$.value);
      this.router.navigate(['login']);
    });
  }
}
