import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WaitConsultation } from 'src/app/classes/waitConsultation';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-consult-wait',
  templateUrl: './admin-consult-wait.component.html',
  styleUrls: ['./admin-consult-wait.component.scss']
})
export class AdminConsultWaitComponent implements OnInit {
  mediData: WaitConsultation[];
  constructor(private router: Router,public admin:AdminService) { }

  ngOnInit(): void {
    this.admin.getWaitConsultation().subscribe(
      data1=>{
        this.mediData=data1;
      }
   )
  
  }
  

}
