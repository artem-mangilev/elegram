import { Directive, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appInputRef]',
})
export class InputRefDirective {
  constructor(private renderer: Renderer2) {}

  get id(): string {
    return this.elem.id
  }

  private get elem() {
    return this.renderer.selectRootElement('input')
  }

  addClass(className: string): void {
    return this.renderer.addClass(this.elem, className)
  }
}
