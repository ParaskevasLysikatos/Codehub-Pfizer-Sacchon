import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAddPComponent } from './doctor-add-p.component';

describe('DoctorAddPComponent', () => {
  let component: DoctorAddPComponent;
  let fixture: ComponentFixture<DoctorAddPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAddPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAddPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
