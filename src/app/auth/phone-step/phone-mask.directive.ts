import { Directive, ElementRef, HostListener } from '@angular/core'

import { PhoneService } from '../phone-step/phone.service'

@Directive({
  selector: '[appPhoneMask]',
})
export class PhoneMaskDirective {
  private prevValid: boolean
  private prevValue: string

  constructor(
    private inputRef: ElementRef,
    private phoneService: PhoneService
  ) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const raw = this.phoneService.raw(value)
    const formatted = this.phoneService.format(raw)

    if (
      this.prevValid &&
      raw.length > this.phoneService.raw(this.prevValue).length
    ) {
      this.inputRef.nativeElement.value = this.prevValue
    } else {
      this.inputRef.nativeElement.value = formatted

      this.prevValid = this.phoneService.isValid(formatted)
      this.prevValue = formatted
    }
  }
}
