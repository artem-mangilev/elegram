import { Directive, HostListener } from '@angular/core'
import { NgControl } from '@angular/forms'

import { PhoneService } from '../phone-step/phone.service'

@Directive({
  selector: '[appPhoneMask]',
})
export class PhoneMaskDirective {
  constructor(
    private ngControl: NgControl,
    private phoneService: PhoneService
  ) {}

  @HostListener('ngModelChange', ['$event']) onModelChange(
    event: string
  ): void {
    this.onInputChange(event)
  }

  onInputChange(value: string): void {
    const formatted = this.phoneService.format(this.phoneService.raw(value))
    this.ngControl.valueAccessor.writeValue(formatted)
  }
}
