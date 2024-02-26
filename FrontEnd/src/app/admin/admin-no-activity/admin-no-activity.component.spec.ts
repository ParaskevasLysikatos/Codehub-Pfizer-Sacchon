import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNoActivityComponent } from './admin-no-activity.component';

describe('AdminNoActivityComponent', () => {
  let component: AdminNoActivityComponent;
  let fixture: ComponentFixture<AdminNoActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminNoActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNoActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
