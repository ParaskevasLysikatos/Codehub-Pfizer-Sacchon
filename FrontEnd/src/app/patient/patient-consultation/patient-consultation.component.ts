import { Component } from '@angular/core';
import { IConsultation } from '../../Interfaces/consultation.interface';
import { MeasurementsService } from '../../services/measurements.service';
import { map } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-patient-consultation',
  templateUrl: './patient-consultation.component.html',
  styleUrl: './patient-consultation.component.scss',
})
export class PatientConsultationComponent {
  mediData?: IConsultation[];

  constructor(
    private data: MeasurementsService,
    private Uservice: UserService
  ) {}

  serviceObj = { id: '', user_id: '' };

  ngOnInit(): void {
    if (this.Uservice.subject_curr_user$.value.id == 0) {
      this.Uservice.getUserData('')
        .pipe(map((res) => res.data.user))
        .subscribe((data) => {
          this.Uservice.subject_curr_user$.next(data);
          this.serviceObj['user_id'] = String(data.id) ?? '';
      console.log(this.serviceObj);
      this.data
        .getPatientConsultation(this.serviceObj)
        .pipe(map((res) => res.data.consultations_patient))
        .subscribe((data) => {
          this.mediData = data;
        });
        });

    } else {
      this.serviceObj['user_id'] =
        String(this.Uservice.subject_curr_user$.value.id) ?? '';
      console.log(this.serviceObj);
      this.data
        .getPatientConsultation(this.serviceObj)
        .pipe(map((res) => res.data.consultations_patient))
        .subscribe((data) => {
          this.mediData = data;
        });
    }
  }
}
