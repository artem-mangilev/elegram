import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core'
@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent implements OnInit {
  @Input() iconClassName = ''

  @Output() readonly mouseDownEvent = new EventEmitter()

  constructor() { }

  ngOnInit(): void { }
}
