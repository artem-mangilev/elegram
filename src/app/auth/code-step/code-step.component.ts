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

@Component({
  selector: 'app-code-step',
  templateUrl: './code-step.component.html',
  styleUrls: ['./code-step.component.scss', './../step.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeStepComponent implements OnInit, AfterViewInit, OnDestroy {
  phone = ''
  inputLabel = 'Code'
  inputStatus = 'default'

  private codeLength = 0
  private nextFrame = 0
  private frameStepSize = 0
  private monkeyIdle: AnimationItem
  private monkeyTracking: AnimationItem
  private readonly monkeyTrackingDuration = 180

  @ViewChild('idleMonkeyContainer') idleMonkeyContainer: ElementRef
  @ViewChild('trackingMonkeyContainer') trackingMonkeyContainer: ElementRef

  private sub: Subscription

  constructor(private route: ActivatedRoute) {}

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

  // when init, monkey is in idle
  // when first symbol typed, wait for end of idle,
  // then show tracking monkey and play it to 1/5 of animation
  // when second symbol typed, play to 2/5 of animation
  // repeat until 5/5 and stop
  onInput(value: string): void {
    if (value.length === 1) {
      this.switchToTrackingMonkey && this.switchToTrackingMonkey()
    } else {
      const currentFrame = this.nextFrame

      if (value.length > this.codeLength) {
        this.nextFrame = this.nextFrame + this.frameStepSize
      } else if (value.length < this.codeLength) {
        this.nextFrame = this.nextFrame - this.frameStepSize
      }

      this.monkeyTracking.playSegments([currentFrame, this.nextFrame])
    }

    this.codeLength = value.length
  }

  private switchToTrackingMonkey() {
    this.monkeyIdle.addEventListener('loopComplete', () => {
      this.monkeyIdle.pause()

      this.frameStepSize = this.monkeyTrackingDuration / 5
      this.nextFrame = this.frameStepSize

      this.monkeyTracking = lottie.loadAnimation({
        container: this.trackingMonkeyContainer.nativeElement,
        renderer: 'svg',
        loop: false,
        initialSegment: [0, this.frameStepSize],
        path: '../../../assets/monkey/TwoFactorSetupMonkeyTracking.json',
      })

      this.monkeyTracking.addEventListener('DOMLoaded', () => {
        this.monkeyIdle.destroy()
      })
    })

    this.switchToTrackingMonkey = undefined
  }
}
