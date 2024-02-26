import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

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

  patPeriodConsultation(data:any):Observable<any>{
    return this.http.patch<any>(this.apiURL + 'consultation', data,this.httpOptionsAuth);
  }

  dateMeasurement(data:any):Observable<any>{
    return this.http.patch<any>(this.apiURL + 'measurements', data,this.httpOptionsAuth);
}

getWaitConsultation():Observable<any>{
  return this.http.get<any>(this.apiURL + 'wait', this.httpOptionsAuth);
}

getPendingDoctor():Observable<any>{
  return this.http.get<any>(this.apiURL + 'pending', this.httpOptionsAuth);
}

getInactiveDoctor():Observable<any>{
  return this.http.get<any>(this.apiURL + 'expired?needDoctors=1',this.httpOptionsAuth);
}

getBeDoctor(id:number):Observable<any>{
return this.http.post<number>(this.apiURL + 'pending',id,this.httpOptionsAuth);
}

getInactivePatient():Observable<any>{
  return this.http.get<any>(this.apiURL + 'expired?needDoctors=0',this.httpOptionsAuth);
}

}
