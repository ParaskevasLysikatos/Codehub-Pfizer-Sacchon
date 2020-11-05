import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientNoActivityComponent } from './patient-no-activity.component';

describe('PatientNoActivityComponent', () => {
  let component: PatientNoActivityComponent;
  let fixture: ComponentFixture<PatientNoActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientNoActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientNoActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
