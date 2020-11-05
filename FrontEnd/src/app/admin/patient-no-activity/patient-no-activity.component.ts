import { Component, OnInit } from '@angular/core';
import { PatientInactive } from 'src/app/classes/patientInactive';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-patient-no-activity',
  templateUrl: './patient-no-activity.component.html',
  styleUrls: ['./patient-no-activity.component.scss']
})
export class PatientNoActivityComponent implements OnInit {
  mediData: PatientInactive[];
  constructor(public admin:AdminService) { }

  ngOnInit(): void {
  }
  Search() {
    this.admin.getInactivePatient().subscribe(
       data1=>{
         this.mediData=data1;
       }
    )
    alert("Show Inactive Patients");
}
}
