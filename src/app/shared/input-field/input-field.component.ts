import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import {
  ControlValueAccessor,
  DefaultValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms'

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputFieldComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  onControlChanged: any = () => {}
  onControlTouched: any = () => {}

  // TODO: find better way to get native element on Input
  @Input() set focus(value: boolean) {
    value && this.doFocus()
  }
  @Input() id = ''
  @Input() label = ''
  // TODO: add styles for success status
  @Input() status: 'default' | 'error' | 'success' = 'default'
  @Input() type: 'text' | 'number' | 'tel' | 'password' = 'text'
  @Input() value = ''

  @Output() readonly update = new EventEmitter<string>()

  @ViewChild('input') input
  @ViewChild(DefaultValueAccessor) valueAccessor: DefaultValueAccessor

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.valueAccessor.registerOnChange(this.onControlChanged)
    this.valueAccessor.registerOnTouched(this.onControlTouched)
  }

  onKeyUp(value: string): void {
    this.update.emit(value)
  }

  doFocus(): void {
    setTimeout(() => this.input.nativeElement.focus())
  }

  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onControlChanged = fn
  }

  registerOnTouched(fn: any): void {
    this.onControlTouched = fn
  }
}
