import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { InputRefDirective } from './input-ref.directive'

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent implements OnInit, AfterContentInit {
  id = ''
  passwordHidden

  @Input() label = ''
  // TODO: add styles for success status
  @Input() set status(value: 'default' | 'error' | 'success') {
    setTimeout(() => this.input.addClass(value))
  }

  @Output() readonly passwordShow = new EventEmitter()
  @Output() readonly passwordHide = new EventEmitter()

  @ContentChild(InputRefDirective) input: InputRefDirective

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.id = this.input.getProperty('id')

    if (this.input.getProperty('type') === 'password') {
      this.passwordHidden = true
    }
  }

  showPassword(): void {
    this.passwordShow.emit()
    this.passwordHidden = false
    this.input.setProperty('type', 'text')
  }

  hidePassword(): void {
    this.passwordHide.emit()
    this.passwordHidden = true
    this.input.setProperty('type', 'password')
  }
}
