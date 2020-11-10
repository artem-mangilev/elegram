import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {
  // TODO: find better way to get native element on Input
  @Input() set focus(value: boolean) {
    setTimeout(() => value && this.input.nativeElement.focus())
  }
  @Input() id = ''
  @Input() label = ''
  // TODO: add styles for success status
  @Input() status: 'default' | 'error' | 'success' = 'default'
  @Input() type: 'text' | 'number' | 'tel' | 'password' = 'text'
  @Input() value = ''

  @Output() readonly update = new EventEmitter<string>()

  @ViewChild('input') input

  constructor() {}

  ngOnInit(): void {}

  onKeyUp(value: string): void {
    this.update.emit(value)
  }
}
