import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAccComponent } from './doctor-acc.component';

describe('DoctorAccComponent', () => {
  let component: DoctorAccComponent;
  let fixture: ComponentFixture<DoctorAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
