import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneStepComponent } from './phone-step.component';

describe('PhoneStepComponent', () => {
  let component: PhoneStepComponent;
  let fixture: ComponentFixture<PhoneStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
