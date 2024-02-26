import { Component } from '@angular/core';
import { IUser } from '../../Interfaces/user.interface';
import { AdminService } from '../../services/admin.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-patient-no-activity',
  templateUrl: './patient-no-activity.component.html',
  styleUrl: './patient-no-activity.component.scss'
})
export class PatientNoActivityComponent {

  mediData?: IUser[];
  constructor(public admin:AdminService) { }

  ngOnInit(): void {
    this.admin.getInactivePatient().pipe(map((res)=>res.data.expired)).subscribe(
      data1=>{
        this.mediData=data1;
      }
   )
  }

}
