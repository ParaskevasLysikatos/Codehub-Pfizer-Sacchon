import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorViewPComponent } from './doctor/doctor-view-p/doctor-view-p.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  {path:'login',component: LoginComponent},

  {path:'patient',component: PatientComponent},

  {path: 'doctor', component: DoctorComponent},
//   {path: 'doctorAcc', component: DoctorAccComponent,canActivate: [FrontEndGuardD]},
// {path: 'doctorAddP', component: DoctorAddPComponent,canActivate: [FrontEndGuardD]},
 {path: 'doctorViewP', component: DoctorViewPComponent},
// {path: 'doctorConsultP', component: DoctorConsultPComponent,canActivate: [FrontEndGuardD]},


  { path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
