import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-signup-step',
  templateUrl: './signup-step.component.html',
  styleUrls: ['./signup-step.component.scss', './../step.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupStepComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
