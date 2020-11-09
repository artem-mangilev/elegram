import { Component, OnInit } from '@angular/core'
import { PhoneService } from './phone.service'

@Component({
  selector: 'app-phone-step',
  templateUrl: './phone-step.component.html',
  styleUrls: ['./phone-step.component.scss'],
})
export class PhoneStepComponent implements OnInit {
  phone = ''

  constructor(private phoneService: PhoneService) {}

  ngOnInit(): void {}

  onPhoneTyped(text: string): void {
    this.phone = this.phoneService.format(text)
  }
}
