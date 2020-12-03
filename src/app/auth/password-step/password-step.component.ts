import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core'

import lottie from 'lottie-web'

@Component({
  selector: 'app-password-step',
  templateUrl: './password-step.component.html',
  styleUrls: ['./password-step.component.scss', './../step.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordStepComponent implements OnInit, AfterViewInit {
  inputLabel = 'Password'

  @ViewChild('monkeyContainer') monkeyContainer: ElementRef

  constructor() {}

  ngOnInit(): void {}

  // animation flow:
  // show Idle
  // when user starts typing,
  // wait for Idle end, remove it
  // if password hidden, run Close to the middle and stop
  // if input is clear and password is hidden, run Close from the middle to the end and stop
  // if password shown, run CloseAndPeek to the end
  // if input is clear and password is shown, run CloseAndPeekToIdle
  // if input is not clear and password changed from hidden to shown, run Peek to the middle
  // if input is not clear and password changed from shown to hidden, run Peek from middle to the end

  ngAfterViewInit(): void {
    lottie.loadAnimation({
      container: this.monkeyContainer.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../../../assets/monkey/TwoFactorSetupMonkeyIdle.json',
    })
  }
}
