import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../Interfaces/user.interface';
import { Observable } from 'rxjs';
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

  httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    }),
  };

  constructor(private http: HttpClient) {}

  registerUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.apiURL + 'users', user, this.httpOptions);
  }

  loginUser(email_password:any):Observable<any>{
    return this.http.post(this.apiURL + 'login',email_password,this.httpOptions);
  }

  getUserData():Observable<any>{
    return this.http.get(this.apiURL + 'profile',this.httpOptionsAuth);
  }

}
