import { Injectable } from '@angular/core';
import  { Observable } from 'rxjs';
import {HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';
import {DoctorClass} from '../classes/doctorClass';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DoctorService {

  readonly url="https://jsonplaceholder.typicode.com/comments?_limit=4";
  readonly urlClean="https://jsonplaceholder.typicode.com/comments";
  allDoctors:DoctorClass[];

  currentDoctor: DoctorClass = {
    name: '',
    email: '',
    id: null,
    body: ''
  }

  constructor(private http: HttpClient) { }

  getAllDoctors() {
    return this.http.get<DoctorClass[]>(this.url, headerOption).subscribe(
      (data: DoctorClass[]) => {
        this.allDoctors = data;
        console.table(this.allDoctors);
      });
  }

  deleteDoctor(id: Number): Observable<DoctorClass> {
    return this.http.delete<DoctorClass>(this.urlClean + '/' + id, headerOption);
  }

  createDoctor(doc: DoctorClass): Observable<DoctorClass> {
    return this.http.post<DoctorClass>(this.urlClean, doc, headerOption);
  }

  updateDoctor(doc: DoctorClass): Observable<DoctorClass> {
    return this.http.put<DoctorClass>(this.urlClean + '/' + doc.id, doc, headerOption);
  }

}
