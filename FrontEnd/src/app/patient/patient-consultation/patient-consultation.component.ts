import { Component, OnInit } from '@angular/core';
import { PatientConsultation } from 'src/app/classes/patientsConsultation';
import { MeasurementsService } from 'src/app/services/measurements.service';

@Component({
  selector: 'app-patient-consultation',
  templateUrl: './patient-consultation.component.html',
  styleUrls: ['./patient-consultation.component.scss']
})
export class PatientConsultationComponent implements OnInit {
  mediData: PatientConsultation[];

  constructor(private data:MeasurementsService) { }

  ngOnInit(): void {
    this.data.getPatientConsultation().subscribe(
      data=>{
        this.mediData=data;
          }
          )
        }

}
