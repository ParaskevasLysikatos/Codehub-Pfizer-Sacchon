import { Injectable } from '@angular/core';
import  { Observable } from 'rxjs';
import {HttpClient,HttpParams} from '@angular/common/http';
import {PatientClass} from '../classes/patientClass';



@Injectable()
export class PatientService {
  readonly url="https://jsonplaceholder.typicode.com/comments?_limit=4";

  constructor(private http:HttpClient) { }

getPatients():Observable<any>{
    return this.http.get(this.url);
  }

  getPatientsWithParams():Observable<any>{
    let p = new HttpParams().set("id","3");
    return this.http.get(this.url,{params:p});
  }

  postPatients(pat:PatientClass):Observable<any>{
    return this.http.post(this.url,pat);
  }

}
