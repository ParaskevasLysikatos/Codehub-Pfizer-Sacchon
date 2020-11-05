import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'codehub-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent implements OnInit {
  formUpdate: FormGroup;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.formUpdate = this.formBuilder.group({
      carb: ['', Validators.required],
      glucose:['', Validators.required],

    });
  }

  logout(){
    sessionStorage.setItem('LoginRole',"");
    this.router.navigate(['login']);
  }
  // convenience getter for easy access to form fields
 get f() { return this.formUpdate.controls; }

 UpdateDataSumbit() {
     this.submitted = true;

     // stop here if form is invalid
     if (this.formUpdate.invalid) {
         return;
     }

     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formUpdate.value))
 }

}
