import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarPickerDialogComponent } from './avatar-picker-dialog.component';

describe('AvatarPickerDialogComponent', () => {
  let component: AvatarPickerDialogComponent;
  let fixture: ComponentFixture<AvatarPickerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarPickerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarPickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
