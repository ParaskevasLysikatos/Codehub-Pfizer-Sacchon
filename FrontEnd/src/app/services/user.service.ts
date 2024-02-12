import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../Interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  header = {headers:new HttpHeaders().set('Content-Type', 'application/json')};
  readonly url="http://localhost/codehub-sacchon-new/BackEnd/public/api/users";


  registerUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.url, user, this.header);
  }



}
