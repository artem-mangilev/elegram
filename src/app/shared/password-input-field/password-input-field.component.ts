import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-password-input-field',
  templateUrl: './password-input-field.component.html',
  styleUrls: ['./password-input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PasswordInputFieldComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputFieldComponent
  implements OnInit, ControlValueAccessor {
  @Input() id = ''
  @Input() label = ''
  @Input() status = 'default'
  @Input() value = ''

  @Output() readonly passwordUpdate = new EventEmitter<string>()
  @Output() readonly passwordShow = new EventEmitter()
  @Output() readonly passwordHide = new EventEmitter()

  passwordHidden = true
  type: 'text' | 'password' = 'password'

  constructor() {}

  ngOnInit(): void {}

  showPassword(): void {
    this.passwordShow.emit()
    this.passwordHidden = false
    this.type = 'text'
  }

  hidePassword(): void {
    this.passwordHide.emit()
    this.passwordHidden = true
    this.type = 'password'
  }

  onChange(value: string): void {}

  onUpdate(value: string): void {
    this.passwordUpdate.emit(value)
    this.onChange(value)
  }

  writeValue(value: string): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(): void {}
}
