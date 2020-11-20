import { Directive, ElementRef, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appInputRef]',
})
export class InputRefDirective {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  addClass(className: string): void {
    this.renderer.addClass(this.el.nativeElement, className)
  }

  setProperty(name: string, value: string): void {
    this.renderer.setProperty(this.el.nativeElement, name, value)
  }

  getProperty(name: string) {
    return this.el.nativeElement[name]
  }
}
