import { Injectable } from '@angular/core';
import  { Observable } from 'rxjs';
import {HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';
import {UserClass} from '../classes/UserClass';
import {LoginClass} from '../classes/LoginClass';
import { AverageDataPatient } from '../classes/averageDataPatient';
import { AverageMeasurements } from '../classes/averageMeasurements';
import { PatientRealClass } from '../classes/patientRealClass';
import { AssocClass } from '../classes/assocClass';
import { IdClass } from '../classes/IdClass';
import { ConsulateCreateClass } from '../classes/consulateCreateClass';
import { GetConsultationsClass } from '../classes/getConsultationsClass';
import { EditConClass } from '../classes/editConClass';
import { AverageDoctorClass } from '../classes/averageDoctorClass';
import { StartEndDateDocClass } from '../classes/startEndDateDocClass';
import { AvgMClass } from '../classes/avgMClass';

//const headerOption = {
 // headers1: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Basic ' + btoa(sessionStorage.getItem("credentials"))
  //                    })
  //    };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url="http://localhost:9000/sacchon/users";

  readonly urlGetUserdata="http://localhost:9000/sacchon/profile";

  readonly urlI="http://localhost:9000/sacchon/users/interacts";

  readonly average="http://localhost:9000/sacchon/data";
  readonly urlAssoc="http://localhost:9000/sacchon/associations";

  readonly assoc1="?categoryType=2"

  readonly UrlCon="http://localhost:9000/sacchon/consultation";

  readonly UrlAvg="http://localhost:9000/sacchon/data";
  
  currentUser: UserClass = { 
    first_name:'',
    last_name: '',
    email: '',
    password: '',
    accountType: 0,
    amka: 0,
    mobile_phone_number: 0,
    address:'',
    gender: 0,
    phone_number:0, 
  }

  currentLogin: LoginClass = {
    userEmail: '',
    userPassword: ''  
  }

  averageData: AverageDataPatient = { 
    amka:0,
    startAt:'',
    endAt:''
  }


  averageDataMeasurements: AverageMeasurements={
  
    numberOfResults: 0,
    avgBloodGlucoseLevel: 0,
    avgCarbIntake: 0
  }


  currentPatient:PatientRealClass={
    id:0,
    first_name:'',
    last_name: '',
    email: '',
    password: '',
    accountType: 0,
    amka: 0,
    mobile_phone_number: 0,
    address: '',
    gender: 0,
    phone_number:0,
    registration_date:''


  }
  


  currentAssoc:AssocClass={
    doctor:0,
    patient:0
  }

currentId:IdClass={
  userID:0
}


currentCon:ConsulateCreateClass={
  patientID:0,
  consultationMsg:''
  
}

editCurrentCon:EditConClass={
  patientID:0,
    consultationID:0,
    consultationMsg: '',
    registerDate: ''
}

currentAD:AverageDoctorClass={
  userID:0,
  startAt:'',
  endAt:''
  
}
currentAvg:AvgMClass={
  numberOfResults: 0,
  avgBloodGlucoseLevel: 0,
  avgCarbIntake: 0
    
}


  constructor(private http: HttpClient) { }


  registerUser(user: UserClass): Observable<UserClass> {
    let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
    //.set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
  }
    return this.http.put<UserClass>(this.url, user, header);
  }


  loginUser(user:LoginClass):Observable<any>{
    let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
   // .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
  }
    return this.http.post(this.url,user,header);
  }

  getUserData():Observable<any>{
    let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
  }
    return this.http.get(this.urlGetUserdata,header);
  }

  editUserData(user:UserClass):Observable<UserClass>{
    let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
  }
    return this.http.put<UserClass>(this.urlGetUserdata,user,header);
  }


  
  deleteUser():Observable<UserClass>{
    let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
  }
  return this.http.delete<UserClass>(this.urlI ,header);
  }

//associations------------------------------------------------------------------

getFreePatients():Observable<any>{
  let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
}
  return this.http.get(this.urlAssoc+this.assoc1,header);
}


getDocAssocPatients():Observable<any>{
  let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
}
  return this.http.get(this.urlAssoc,header);
}


addFreePatient(patA:AssocClass):Observable<any>{
  let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
  }
    return this.http.put<AssocClass>(this.urlAssoc,patA,header);
}

  averageDataPatient(data: AverageDataPatient):Observable<any>{
    let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
  }
  return this.http.post<AverageDataPatient>(this.average, data, header);
}
get1User(id:IdClass):Observable<PatientRealClass>{
  let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
}
  return this.http.post<PatientRealClass>(this.urlI,id,header);
}


createCon(con:ConsulateCreateClass){
  let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
}
    return this.http.post<ConsulateCreateClass>(this.UrlCon,con,header);
}

getCon(id:number):Observable<any>{
  let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
}
    return this.http.get<any>(this.UrlCon+"?categoryType="+id,header);
}


get1Con(id:number):Observable<any>{
  let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
}
    return this.http.get<any>(this.UrlCon+"?consultationID="+id,header);
}
    
editCon(editC:EditConClass):Observable<EditConClass>{
let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
  .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
} 
  return this.http.put<EditConClass>(this.UrlCon,editC,header);
}


deleteCon(cid:number):Observable<any>{
  let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
  } 
    return this.http.delete<any>(this.UrlCon+"?consultationID="+cid,header);
  }


  getAvgDoctor(avgD:AverageDoctorClass):Observable<any>{
    let header= { headers:new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization',`Basic ${btoa(sessionStorage.getItem("credentials"))}`)
  }
      return this.http.post<any>(this.UrlAvg,avgD,header);
  }


}
