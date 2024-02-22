import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMeasurement } from '../Interfaces/measurements.interface';
import { Observable } from 'rxjs';
import { IConsultation } from '../Interfaces/consultation.interface';

@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  // Define API
  readonly apiURL = `${environment.domain}`;
  // Http Options

  httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    }),
  };

  constructor(private http: HttpClient) { }

  addDataMeasurements(data:IMeasurement): Observable<any> {
    return this.http.post<IMeasurement>(this.apiURL + 'measurements', data, this.httpOptionsAuth);
  }

  getMeasurementsData(id_stD_enD:any):Observable<{data:{patientMeasurements:IMeasurement[]}}>{
    return this.http.post<any>(this.apiURL + 'patient?id='+id_stD_enD.id+'&startAt='+id_stD_enD.startAt+'&endAt='+id_stD_enD.endAt,null,this.httpOptionsAuth);
  }

  get1M(id: number): Observable<{data:{measurement:IMeasurement}}> {
    return this.http.get<any>(this.apiURL + 'measurements?measurementID='+id, this.httpOptionsAuth);
  }

  updateMediData(data: IMeasurement): Observable<IMeasurement>{
    return this.http.put<IMeasurement>(this.apiURL + 'measurements',data,this.httpOptionsAuth);
  }

  removeMedi(id: number): Observable<IMeasurement>{
    return this.http.delete<IMeasurement>(this.apiURL + 'measurements?measurementID='+id, this.httpOptionsAuth);
  }

  averageDataPatient(amka_dates: any):Observable<any>{
  return this.http.post<any>(this.apiURL + 'data', amka_dates, this.httpOptionsAuth);
}

getPatientConsultation(conId_userId:any):Observable<any>{
  return this.http.get<any>(this.apiURL + 'consultation?consultation_id='+(conId_userId.id ?? '' )+'&user_id='+(conId_userId.user_id ?? ''), this.httpOptionsAuth);
}

createCon(conMsg_userId:any){
    return this.http.post<IConsultation>(this.apiURL + 'consultation?consultationMsg='+conMsg_userId.consultationMsg+'&user_id='+conMsg_userId.user_id,null,this.httpOptionsAuth);
}

editCon(editC:any):Observable<IConsultation>{
    return this.http.put<any>(this.apiURL + 'consultation',editC,this.httpOptionsAuth);
  }

deleteCon(cid:number):Observable<any>{
      return this.http.delete<any>(this.apiURL + 'consultation?id='+cid,this.httpOptionsAuth);
    }

}
