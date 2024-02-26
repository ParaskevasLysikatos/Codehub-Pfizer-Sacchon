import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-consult-wait',
  templateUrl: './admin-consult-wait.component.html',
  styleUrl: './admin-consult-wait.component.scss'
})
export class AdminConsultWaitComponent {

  mediData:any;
  constructor(private router: Router,public admin:AdminService) { }

  ngOnInit(): void {
    this.admin.getWaitConsultation().pipe(map((res)=>res.data[0])).subscribe(
      data1=>{
        console.log(data1);
        this.mediData=data1;
      }
   )

  }

}
