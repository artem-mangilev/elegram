import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonComponent implements OnInit {
  @Input() status: 'default' | 'loading' = 'default'
  @Input() value = ''

  @Output() readonly clickEvent = new EventEmitter()

  rippleColor = '#00000020'

  constructor() {}

  ngOnInit(): void {}
}
