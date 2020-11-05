import { Injectable } from '@angular/core';
import {HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';
import { Measurements } from '../classes/measurements';
import { Observable } from 'rxjs';
import { PostData } from '../classes/postData';
import { StartEndDateClass } from '../classes/startEndDateClass';
import { MeasurIDClass } from '../classes/MeasurIDClass';
import { PatientConsultation } from '../classes/patientsConsultation';
import { StartEndDateDocClass } from '../classes/startEndDateDocClass';


const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Basic ' + btoa(sessionStorage.getItem('credentials'))
                      })
      };

@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  readonly url="http://localhost:9000/sacchon/measurements";
  readonly urlPatient="http://localhost:9000/sacchon/patient ";

  readonly urlM1="http://localhost:9000/sacchon/measurements?measurementID=";

  readonly patientConsultation="http://localhost:9000/sacchon/consultation";
  
  addMeasurements: Measurements = {
    bloodGlucoseLevel: 0,
    carbIntake: 0,
    measurementDate: '',
    measurementID:0,
  }
  currentMeasurements: Measurements = {
    bloodGlucoseLevel: 0,
    carbIntake: 0,
    measurementDate: '',
    measurementID:0,
  }

  currentStEndDate:StartEndDateClass={
    startAt:'',
    endAt:''
  }
  postData:PostData={
    
    userID:0
  }
  mID:MeasurIDClass={
     measurementID:0
  }

  consultationPatient: PatientConsultation={
    consultationID: 0,
    patientID:  0,
    registerDate: '',
    consultationMsg: ''
  }
  currentSTD:StartEndDateDocClass={
    userID:0,
    startAt:'',
    endAt:''
    
  }
  
  constructor(private http: HttpClient) { }

  addDataMeasurements(data: Measurements): Observable<Measurements> {
    return this.http.post<Measurements>(this.url, data, headerOption);
  }
  getMeasurementsData(seDate:StartEndDateClass):Observable<any>{
    return this.http.post<any>(this.urlPatient,seDate,headerOption);
  }

  get1M(data: number): Observable<Measurements> {
    return this.http.get<Measurements>(this.urlM1+data, headerOption);
  }
  
  updateMediData(data: Measurements): Observable<Measurements>{
    return this.http.put<Measurements>(this.url,data,headerOption);
  }
  removeMedi(data: number): Observable<Measurements>{
    return this.http.delete<Measurements>(this.urlM1 + data, headerOption);
  }
  getPatientConsultation():Observable<any>{
  let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
  }
  return this.http.get(this.patientConsultation, header)
}
}