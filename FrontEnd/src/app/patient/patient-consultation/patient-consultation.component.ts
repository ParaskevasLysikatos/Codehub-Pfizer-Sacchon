import { Component } from '@angular/core';
import { IConsultation } from '../../Interfaces/consultation.interface';
import { MeasurementsService } from '../../services/measurements.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-patient-consultation',
  templateUrl: './patient-consultation.component.html',
  styleUrl: './patient-consultation.component.scss'
})
export class PatientConsultationComponent {

  mediData?: IConsultation[];

  constructor(private data:MeasurementsService) { }

  serviceObj={id:'',user_id:''};

  ngOnInit(): void {
    this.serviceObj['user_id']=localStorage.getItem('id') ?? '';
    console.log(this.serviceObj);
    this.data.getPatientConsultation(this.serviceObj).pipe(map((res)=>res.data.consultations_patient)).subscribe(
      data=>{
        this.mediData=data;
          }
          )
        }

}
