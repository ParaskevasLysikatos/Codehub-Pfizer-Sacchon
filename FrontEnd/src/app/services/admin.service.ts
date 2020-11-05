import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorInactive } from '../classes/doctoInactive';
import { IsDoctor } from '../classes/isDoctor';
import { PatientInactive } from '../classes/patientInactive';
import { PendingDoctor } from '../classes/pendingDoctor';
import { PostData } from '../classes/postData';
import { SubData } from '../classes/subData';
import { SubDoctor } from '../classes/subDoctor';
import { SubDoctorReturn } from '../classes/subDoctorReturn';
import { SubPatient } from '../classes/subPatient';
import { WaitConsultation } from '../classes/waitConsultation';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Basic ' + btoa(sessionStorage.getItem('credentials'))
                      })
      };

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly urlDoctor="http://localhost:9000/sacchon/expired?needDoctors=true";
  readonly urlPatient="http://localhost:9000/sacchon/expired?needDoctors=false";
  readonly urlSubPatient="http://localhost:9000/sacchon/measurements";
  readonly PendingDoctor="http://localhost:9000/sacchon/pending";
  readonly waitConsultation="http://localhost:9000/sacchon/consultation/wait";
  readonly urlSubDoctor="http://localhost:9000/sacchon/consultation";

  constructor(private http: HttpClient) { }

  doctorInactive: DoctorInactive = {
    
    doctorID: 0,
    lastLogin: '',
    amka:0
  }
  patientInactive: PatientInactive = {
    doctorID: 0,
    lastLogin: '',
    amka:0 
  }
  subPatient: SubPatient = {
    bloodGlucoseLevel: 0,
    carbIntake: 0,
    measurementDate:''
   
  }
  subData: SubData = { 
    amka:0,
    startAt:'',
    endAt:''
   
  }
  wait: WaitConsultation = { 
    first_name: '',
    last_name: '',
    patientsId: 0,
    daysFromLastConsultation: 0
   
  }
  pending:PendingDoctor={
    
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    accountType: '',
    amka: 0,
    registration_date: '',
}

  beDoctor: IsDoctor={
  userID:0
}
subDoctor: SubDoctor={

  amka: 0,
  startAt:'',
  endAt:'',
  
}

subDoctorReturn: SubDoctorReturn={
  first_name:'',
  last_name:'',
  consultationMsg:'',
  registeredDate:'',
 
}

  getInactiveDoctor():Observable<any>{
    return this.http.get<DoctorInactive>(this.urlDoctor,headerOption);
  }
  getInactivePatient():Observable<any>{
    return this.http.get<DoctorInactive>(this.urlPatient,headerOption);
  }
  getSubPatient(data:SubData):Observable<any>{
    return this.http.patch<SubData>(this.urlSubPatient, data,headerOption);
}
  getPendingDoctor():Observable<any>{
  let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
  }
  return this.http.get(this.PendingDoctor, header)
}
    getBeDoctor(data: IsDoctor):Observable<any>{
  let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
}
return this.http.post<IsDoctor>(this.PendingDoctor, data,header);
}

getWaitConsultation():Observable<any>{
  let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
  }
  return this.http.get(this.waitConsultation, header)
}

getSubDoctor(data:SubDoctor):Observable<any>{
  let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
  }
  
  return this.http.patch<SubDoctor>(this.urlSubDoctor, data,header);
}

}
