import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subscription } from 'rxjs'

import lottie, { AnimationItem } from 'lottie-web'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-code-step',
  templateUrl: './code-step.component.html',
  styleUrls: ['./code-step.component.scss', './../step.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeStepComponent implements OnInit, AfterViewInit, OnDestroy {
  inputLabel = 'Code'
  inputStatus = 'default'
  phone = ''

  private fromIdleToTracking: Promise<unknown>
  private initialInputMouseOver = true
  private monkeyIdle: AnimationItem
  private monkeyTracking: AnimationItem
  private monkeyTrackingCurrentFrame = 1
  private readonly monkeyTrackingDuration = 180
  private readonly monkeyTrackingframeStepSize = this.monkeyTrackingDuration / 5
  private sub: Subscription

  @ViewChild('idleMonkeyContainer') idleMonkeyContainer: ElementRef
  @ViewChild('trackingMonkeyContainer') trackingMonkeyContainer: ElementRef

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.phone = params.get('phone')
    })
  }

  ngAfterViewInit(): void {
    this.monkeyIdle = lottie.loadAnimation({
      container: this.idleMonkeyContainer.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../../../assets/monkey/TwoFactorSetupMonkeyIdle.json',
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  onInputMouseOver(): void {
    if (this.initialInputMouseOver) {
      this.fromIdleToTracking = new Promise((resolve, reject) => {
        this.monkeyIdle.addEventListener('loopComplete', resolve)
      })
        .then(() => {
          return new Promise((resolve, reject) => {
            this.monkeyIdle.pause()

            this.monkeyTracking = lottie.loadAnimation({
              container: this.trackingMonkeyContainer.nativeElement,
              renderer: 'svg',
              loop: false,
              initialSegment: [0, this.monkeyTrackingCurrentFrame],
              path: '../../../assets/monkey/TwoFactorSetupMonkeyTracking.json',
            })

            this.monkeyTracking.setSpeed(1.6)

            this.monkeyTracking.addEventListener('DOMLoaded', resolve)
          })
        })
        .then(() => {
          this.monkeyIdle.destroy()
        })
    }

    this.initialInputMouseOver = false
  }

  onInput(value: string): void {
    this.fromIdleToTracking.then(() => {
      const nextFrame = value.length * this.monkeyTrackingframeStepSize

      this.monkeyTracking.playSegments(
        [this.monkeyTrackingCurrentFrame, nextFrame],
        true
      )

      this.monkeyTrackingCurrentFrame = nextFrame
    })

    if (value.length === 5) {
      this.authService.signIn(value).then(() => {
        console.log('signed in')
      })
    }
  }
}
