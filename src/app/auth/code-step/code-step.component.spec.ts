import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeStepComponent } from './code-step.component';

describe('CodeStepComponent', () => {
  let component: CodeStepComponent;
  let fixture: ComponentFixture<CodeStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
