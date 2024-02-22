import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorViewPComponent } from './doctor/doctor-view-p/doctor-view-p.component';
import { DoctorAccComponent } from './doctor/doctor-acc/doctor-acc.component';
import { DoctorAddPComponent } from './doctor/doctor-add-p/doctor-add-p.component';
import { DoctorConsultPComponent } from './doctor/doctor-consult-p/doctor-consult-p.component';
import { FrontEndGuardP } from './services/guardP';
import { FrontEndGuardD } from './services/guardD';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'patient', component: PatientComponent ,canActivate: [FrontEndGuardP]},

  { path: 'doctor', component: DoctorComponent,canActivate: [FrontEndGuardD] },
  { path: 'doctorAcc', component: DoctorAccComponent ,canActivate: [FrontEndGuardD]},
  { path: 'doctorAddP', component: DoctorAddPComponent ,canActivate: [FrontEndGuardD]},
  { path: 'doctorViewP', component: DoctorViewPComponent,canActivate: [FrontEndGuardD] },
  { path: 'doctorConsultP', component: DoctorConsultPComponent,canActivate: [FrontEndGuardD] },

  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
