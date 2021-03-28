import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-signup-step',
  templateUrl: './signup-step.component.html',
  styleUrls: ['./signup-step.component.scss', './../step.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupStepComponent implements OnInit {
  form = this.fb.group({
    firstName: [''],
    lastName: ['']
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

  }

  signUp() {
    const fname = this.form.get('firstName').value
    const lname = this.form.get('lastName').value

    this.authService.signUp(fname, lname)
  }
}
