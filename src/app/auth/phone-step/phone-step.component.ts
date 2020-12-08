import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
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
  buttonStatus = 'default'
  phone = ''
  phoneInputLabel = 'Phone Number'
  phoneInputStatus = 'default'

  @ViewChild('input') input: ElementRef

  constructor(
    private cd: ChangeDetectorRef,
    private phoneService: PhoneService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onButtonClick(): void {
    this.buttonStatus = 'loading'

    this.authService
      .setPhoneNumber(this.phone)
      .then(() => {
        this.router.navigate(['/auth/code', this.phone])
      })
      .catch((error) => {
        console.log(error)

        this.phoneInputLabel = error.error_message
        this.phoneInputStatus = 'error'
        this.input.nativeElement.focus()

        this.buttonStatus = 'default'

        // TODO: detect changes automatically if it's possible
        this.cd.detectChanges()
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
