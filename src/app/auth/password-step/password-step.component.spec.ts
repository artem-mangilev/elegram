import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordStepComponent } from './password-step.component';

describe('PasswordStepComponent', () => {
  let component: PasswordStepComponent;
  let fixture: ComponentFixture<PasswordStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
