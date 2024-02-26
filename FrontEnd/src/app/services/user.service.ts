import { IUser } from './../Interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Define API
  readonly apiURL = `${environment.domain}`;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  subject_curr_user$ = new BehaviorSubject({
    "id": 0,
    "accountType": 0,
    "first_name": "",
    "last_name": "",
    "active": '',
    "address": "",
    "amka": 0,
    "mobile_phone": 0,
    "home_phone": 0,
    "gender": 0,
    "last_login": "",
    "email": "",
    "email_verified_at": null,
    "created_at": "",
    "updated_at": ""
});

subject_curr_userClear$ = new BehaviorSubject({
  "id": 0,
  "accountType": 0,
  "first_name": "",
  "last_name": "",
  "active": '',
  "address": "",
  "amka": 0,
  "mobile_phone": 0,
  "home_phone": 0,
  "gender": 0,
  "last_login": "",
  "email": "",
  "email_verified_at": null,
  "created_at": "",
  "updated_at": ""
});

  httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    }),
  };

  constructor(private http: HttpClient) {}

  logoutUser():Observable<any>{
    return this.http.post(this.apiURL + 'logout',null,this.httpOptionsAuth);
  }

  registerUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.apiURL + 'users', user, this.httpOptions);
  }

  loginUser(email_password:any):Observable<any>{
    return this.http.post(this.apiURL + 'login',email_password,this.httpOptions);
  }

  getUserData(id:number|string):Observable<any>{
    return this.http.get(this.apiURL + 'profile?id='+(id ?? ''),this.httpOptionsAuth);
  }

  editUserData(user:IUser):Observable<IUser>{
    return this.http.put<IUser>(this.apiURL + 'profile',user,this.httpOptionsAuth);
  }


  deleteUser():Observable<any>{
  return this.http.delete<any>(this.apiURL + 'interacts' ,this.httpOptionsAuth);
  }

  getDocAssocPatients(type:number):Observable<any>{ // 2 is free, null is with, 1 is with specific doc
    return this.http.get(this.apiURL + 'associations?categoryType='+type,this.httpOptionsAuth);
  }

  addFreePatient(docId_patId:any):Observable<any>{
      return this.http.post<any>(this.apiURL + 'associations',docId_patId,this.httpOptionsAuth);
  }

}
