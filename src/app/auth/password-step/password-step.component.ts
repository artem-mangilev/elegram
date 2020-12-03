import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-password-step',
  templateUrl: './password-step.component.html',
  styleUrls: ['./password-step.component.scss', './../step.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordStepComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
