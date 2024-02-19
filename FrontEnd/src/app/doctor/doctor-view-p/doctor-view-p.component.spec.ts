import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorViewPComponent } from './doctor-view-p.component';

describe('DoctorViewPComponent', () => {
  let component: DoctorViewPComponent;
  let fixture: ComponentFixture<DoctorViewPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorViewPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorViewPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
