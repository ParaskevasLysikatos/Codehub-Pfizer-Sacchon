import { NgModule } from "@angular/core";
import { PatientComponent } from "./patient.component";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./patient-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InsertDataComponent } from './insert-data/insert-data.component';
import { PatientNavComponent } from './patient-nav/patient-nav.component';
import { ListDataComponent } from "./list-data/list-data.component";
import { ChartsDataComponent } from './charts-data/charts-data.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";




@NgModule({
  declarations: [
    PatientComponent,
    InsertDataComponent,
    PatientNavComponent,
     InsertDataComponent,
     ListDataComponent,
     ChartsDataComponent,
    // AverageDataComponent,
    // UpdateComponent,
    //  PatientConsultationComponent
    ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports:[
    //InsertDataComponent
  ]
})
export class PatientModule { }
