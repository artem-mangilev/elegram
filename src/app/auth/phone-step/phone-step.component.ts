import { Component, OnInit, ViewChild } from '@angular/core'

import { PhoneService } from './phone.service'
import { InputFieldComponent } from '../../shared/input-field/input-field.component'

@Component({
  selector: 'app-phone-step',
  templateUrl: './phone-step.component.html',
  styleUrls: ['./phone-step.component.scss'],
})
export class PhoneStepComponent implements OnInit {
  phone = 'test'

  @ViewChild(InputFieldComponent) private phoneInput: InputFieldComponent

  constructor(private phoneService: PhoneService) {}

  ngOnInit(): void {}

  onCountrySelected(text: string): void {
    this.setPhone(text)
    this.phoneInput.doFocus()
  }

  setPhone(text: string): void {
    this.phone = this.phoneService.format(text)
  }
}
