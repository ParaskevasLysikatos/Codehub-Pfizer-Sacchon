import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { MatchOtherValidator } from '../../_helpers/must-match.validator';

@Component({
  selector: 'app-doctor-acc',
  templateUrl: './doctor-acc.component.html',
  styleUrl: './doctor-acc.component.scss'
})
export class DoctorAccComponent {

  userForm:FormGroup = new FormGroup([]);
  submitted = false;
  genders = {'NA':3,'FEMALE':2, 'MALE':1};

  selectedGender = '';
	onSelected(value:string): void {
		this.selectedGender = value;
	}


  constructor(private _router: Router,public Uservice:UserService) { }

  ngOnInit() {

    this.userForm= new FormGroup({
      first_name:new FormControl('', [Validators.required]),
      last_name:new FormControl('', [Validators.required]),
      gender:new FormControl('', [Validators.minLength(1)]),
      password:new FormControl('', [Validators.minLength(8),Validators.required]),

      password_confirmation:new FormControl('', [Validators.required,Validators.minLength(8),MatchOtherValidator({otherControlFn: () => this.passwordControl})]),

      address:new FormControl('',[Validators.required]),
      mobile_phone:new FormControl('', [ Validators.minLength(10), Validators.maxLength(10)]),
      home_phone:new FormControl('', [ Validators.minLength(10)])
    });

    this.passwordControl.valueChanges.subscribe(() => this.confirmPasswordControl.updateValueAndValidity());

    this.getUserData();

  }
  // convenience getter for easy access to form fields
   get first_name() {
    return this.userForm.get('first_name');
  }

  get last_name() {
    return this.userForm.get('last_name');
  }

  get gender() {
    return this.userForm.get('gender');
  }

  get password() {
    return this.userForm.get('password');
  }

  get password_confirmation() {
    return this.userForm.get('password_confirmation');
  }

  get address() {
    return this.userForm.get('address');
  }

  get mobile_phone() {
    return this.userForm.get('mobile_phone');
  }

  get home_phone() {
    return this.userForm.get('home_phone');
  }

  get passwordControl(): FormControl {
    return this.userForm?.get('password') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.userForm?.get('password_confirmation') as FormControl;
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  getUserData(){
    if(this.Uservice.subject_curr_user$.value.id==0){
    this.Uservice.getUserData('').pipe(map((res)=>res.data.user)).subscribe(
      data=>{ this.userForm.patchValue(data);console.log(data.gender); this.submitted = false;
        this.Uservice.subject_curr_user$.next(data);
      });
    }
    else{
      this.userForm.patchValue(this.Uservice.subject_curr_user$.value);
      this.submitted = false;
    }

    }


  editDoctor(){

    this.submitted = true;
    console.log("pressed");
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }

    let Obj = this.userForm.value;
    Obj['email']=this.Uservice.subject_curr_user$.value.email;
    Obj['accountType']=this.Uservice.subject_curr_user$.value.accountType;
    Obj['amka']=this.Uservice.subject_curr_user$.value.amka;

   this.Uservice.editUserData(Obj).subscribe(
    (data:any)=>{
      alert('update success');
      this.ngOnInit();
      }, error=>alert(error.error.message)
   );
  }


  deleteDoctor(){
    this.Uservice.deleteUser().subscribe(
      res=>{
        this.Uservice.subject_curr_user$.next(this.Uservice.subject_curr_userClear$.value);
      console.log( this.Uservice.subject_curr_user$.value);
      localStorage.clear();

        alert("delete user success");
        this._router.navigate(['/login']);
      },error=>alert(error.error.message)
    );
  }

}
