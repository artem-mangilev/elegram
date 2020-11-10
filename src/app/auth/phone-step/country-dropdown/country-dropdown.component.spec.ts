import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDropdownComponent } from './country-dropdown.component';

describe('CountryDropdownComponent', () => {
  let component: CountryDropdownComponent;
  let fixture: ComponentFixture<CountryDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
