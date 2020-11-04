import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {
  @Input() id = ''
  @Input() label = ''
  // TODO: add styles for success status
  @Input() status: 'default' | 'error' | 'success' = 'default'
  @Input() type: 'text' | 'number' | 'tel' | 'password' = 'text'
  @Input() value = ''

  @Output() change = new EventEmitter<string>()

  passwordHidden = true

  constructor() {}

  ngOnInit(): void {}

  onChange(value: string): void {
    this.change.emit(value)
  }

  showPassword(): void {
    this.passwordHidden = false
    this.type = 'text'
  }

  hidePassword(): void {
    this.passwordHidden = true
    this.type = 'password'
  }
}
