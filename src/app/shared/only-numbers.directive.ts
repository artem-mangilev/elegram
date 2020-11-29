import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({
  selector: '[appOnlyNumbers]',
})
export class OnlyNumbersDirective {
  constructor(private inputRef: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    this.inputRef.nativeElement.value = value.replace(/\D/g, '')
  }
}
