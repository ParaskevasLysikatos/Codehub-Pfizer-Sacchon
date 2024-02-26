import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { PatientModule } from './patient/patient.module';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorNavComponent } from './doctor/doctor-nav/doctor-nav.component';
import { DoctorViewPComponent } from './doctor/doctor-view-p/doctor-view-p.component';

import { PlotlyModule } from 'angular-plotly.js';

import * as PlotlyJS from 'plotly.js-dist-min';
import { DoctorConsultPComponent } from './doctor/doctor-consult-p/doctor-consult-p.component';
import { DoctorAccComponent } from './doctor/doctor-acc/doctor-acc.component';
import { DoctorAddPComponent } from './doctor/doctor-add-p/doctor-add-p.component';
import { FrontEndGuardA } from './services/guardA';
import { AdminComponent } from './admin/admin.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { PatientNoActivityComponent } from './admin/patient-no-activity/patient-no-activity.component';
import { AdminNoActivityComponent } from './admin/admin-no-activity/admin-no-activity.component';
import { AdminConsultWaitComponent } from './admin/admin-consult-wait/admin-consult-wait.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    FooterComponent,
    LoginComponent,
    DoctorComponent,
    DoctorNavComponent,
    DoctorViewPComponent,
    DoctorConsultPComponent,
    DoctorAccComponent,
    DoctorAddPComponent,
    AdminComponent,
    AdminNavComponent,
    PatientNoActivityComponent,
    AdminNoActivityComponent,
    AdminConsultWaitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PatientModule,
    PlotlyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
