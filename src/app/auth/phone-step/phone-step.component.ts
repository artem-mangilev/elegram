import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'

import { PhoneService } from './phone.service'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-phone-step',
  templateUrl: './phone-step.component.html',
  styleUrls: ['./phone-step.component.scss', './../step.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneStepComponent implements OnInit {
  phone = ''
  phoneInputLabel = 'Phone Number'
  phoneInputStatus = 'default'

  @ViewChild('input') input

  constructor(
    private phoneService: PhoneService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onButtonClick(): void {
    this.authService
      .setPhoneNumber(this.phone)
      .then(() => {
        this.router.navigate(['/code', this.phone])
      })
      .catch((error) => {
        console.log(error)
        this.phoneInputLabel = error.error_message
        this.phoneInputStatus = 'error'
      })
  }

  onCountrySelected(text: string): void {
    this.setPhone(text)
    this.input.nativeElement.focus()
  }

  setPhone(text: string): void {
    this.phone = text
  }

  get isPhoneValid(): boolean {
    return this.phoneService.isValid(this.phone)
  }
}
