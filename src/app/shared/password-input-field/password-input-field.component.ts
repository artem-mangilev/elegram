import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'

@Component({
  selector: 'app-password-input-field',
  templateUrl: './password-input-field.component.html',
  styleUrls: ['./password-input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputFieldComponent implements OnInit {
  @Input() id = ''
  @Input() label = ''
  @Input() status = 'default'
  @Input() value = ''

  @Output() passwordUpdate = new EventEmitter<string>()
  @Output() passwordShow = new EventEmitter()
  @Output() passwordHide = new EventEmitter()

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

  onUpdate(value: string): void {
    this.passwordUpdate.emit(value)
  }
}
