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

  @Output() update = new EventEmitter<string>()

  constructor() {}

  ngOnInit(): void {}

  onKeyUp(value: string): void {
    this.update.emit(value)
  }
}
