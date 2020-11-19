import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnInit,
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

  @Input() label = ''
  // TODO: add styles for success status
  @Input() set status(value: 'default' | 'error' | 'success') {
    setTimeout(() => this.input.addClass(value))
  }

  @ContentChild(InputRefDirective) input: InputRefDirective

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.id = this.input.id
  }
}
