import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-password-input-field',
  templateUrl: './password-input-field.component.html',
  styleUrls: ['./password-input-field.component.scss'],
})
export class PasswordInputFieldComponent implements OnInit {
  @Input() id = ''
  @Input() label = ''
  @Input() status = 'default'
  @Input() value = ''

  @Output() passwordUpdate = new EventEmitter<string>()

  passwordHidden = true
  type: 'text' | 'password' = 'password'

  constructor() {}

  ngOnInit(): void {}

  showPassword(): void {
    this.passwordHidden = false
    this.type = 'text'
  }

  hidePassword(): void {
    this.passwordHidden = true
    this.type = 'password'
  }

  onUpdate(value: string): void {
    this.passwordUpdate.emit(value)
  }
}
