import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsultWaitComponent } from './admin-consult-wait.component';

describe('AdminConsultWaitComponent', () => {
  let component: AdminConsultWaitComponent;
  let fixture: ComponentFixture<AdminConsultWaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminConsultWaitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminConsultWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
