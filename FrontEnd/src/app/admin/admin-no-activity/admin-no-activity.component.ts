import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { IUser } from '../../Interfaces/user.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-no-activity',
  templateUrl: './admin-no-activity.component.html',
  styleUrl: './admin-no-activity.component.scss',
})
export class AdminNoActivityComponent {
  form: FormGroup = new FormGroup([]);
  noActivityDoc?: IUser[];
  pending?: IUser[];

  constructor(
    public admin: AdminService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      user_id:new FormControl('',[])
    });

    this.admin.getPendingDoctor().pipe(map((res)=>res.data.pending_docs)).subscribe((data) => {
      this.pending = data;
    });

    this.admin.getInactiveDoctor().pipe(map((res)=>res.data.expired)).subscribe((data1) => {
      this.noActivityDoc = data1;
    });
  }


  Data() {
    this.admin.getBeDoctor(this.form.value).subscribe((data2) => {
      this.pending = data2;
      alert('Doctor Activated success');
      this.ngOnInit();
    });

  }
}
