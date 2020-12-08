import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core'

import lottie, { AnimationItem } from 'lottie-web'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-password-step',
  templateUrl: './password-step.component.html',
  styleUrls: ['./password-step.component.scss', './../step.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordStepComponent implements OnInit, AfterViewInit {
  inputLabel = 'Password'
  password = ''

  private monkeyAnimation: AnimationItem
  private monkeyAnimationDurationMiddle = 33 / 2

  @ViewChild('monkeyContainer') monkeyContainer: ElementRef

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.monkeyAnimation = lottie.loadAnimation({
      container: this.monkeyContainer.nativeElement,
      loop: false,
      initialSegment: [0, 1],
      path: '../../../assets/monkey/TwoFactorSetupMonkeyPeek.json',
    })
  }

  onPasswordShow(): void {
    this.monkeyAnimation.playSegments(
      [1, this.monkeyAnimationDurationMiddle],
      true
    )
  }

  onPasswordHide(): void {
    this.monkeyAnimation.playSegments(
      [this.monkeyAnimationDurationMiddle, 1],
      true
    )
  }

  onInput(value: string): void {
    this.password = value
  }

  onNextButtonClick(): void {
    this.authService.checkPassword(this.password).then((result) => {
      console.log(result)
    })
  }
}
