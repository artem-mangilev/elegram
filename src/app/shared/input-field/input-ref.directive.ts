import { Directive, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appInputRef]',
})
export class InputRefDirective {
  constructor(private renderer: Renderer2) {}

  addClass(className: string): void {
    this.renderer.addClass(this.elem, className)
  }

  setProperty(name: string, value: string): void {
    this.renderer.setProperty(this.elem, name, value)
  }

  getProperty(name: string) {
    return this.elem[name]
  }

  private get elem() {
    return this.renderer.selectRootElement('input')
  }
}
