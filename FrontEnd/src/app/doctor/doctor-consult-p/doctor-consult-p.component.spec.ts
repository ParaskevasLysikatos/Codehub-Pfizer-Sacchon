import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorConsultPComponent } from './doctor-consult-p.component';

describe('DoctorConsultPComponent', () => {
  let component: DoctorConsultPComponent;
  let fixture: ComponentFixture<DoctorConsultPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorConsultPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorConsultPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
