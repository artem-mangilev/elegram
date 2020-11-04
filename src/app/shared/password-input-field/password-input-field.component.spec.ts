import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordInputFieldComponent } from './password-input-field.component';

describe('PasswordInputFieldComponent', () => {
  let component: PasswordInputFieldComponent;
  let fixture: ComponentFixture<PasswordInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordInputFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
