import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'app-phone-step',
  templateUrl: './phone-step.component.html',
  styleUrls: ['./phone-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneStepComponent implements OnInit {
  phone = ''

  @ViewChild('input') input

  constructor() {}

  ngOnInit(): void {}

  onCountrySelected(text: string): void {
    this.setPhone(text)
    this.input.nativeElement.focus()
  }

  setPhone(text: string): void {
    this.phone = text
  }
}
