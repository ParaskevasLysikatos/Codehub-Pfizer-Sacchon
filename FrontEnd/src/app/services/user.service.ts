import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../Interfaces/user.interface';
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



  subject_token$ = new BehaviorSubject("");
  subject_LoginRole$ = new BehaviorSubject(0);
  subject_amka$ = new BehaviorSubject(0);
  subject_email$ = new BehaviorSubject("");
  subject_id$ = new BehaviorSubject(0);


  httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')//this.subject_token$.value
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

  getUserData(id?:number|null):Observable<any>{
    console.log(this.subject_token$.value);
    return this.http.get(this.apiURL + 'profile?id='+id,this.httpOptionsAuth);
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

}
