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

  private monkeyIdle: AnimationItem
  private monkeyTracking: AnimationItem
  private monkeyTrackingCurrentFrame = 1
  private readonly monkeyTrackingDuration = 180
  private readonly frameStepSize = this.monkeyTrackingDuration / 5

  @ViewChild('idleMonkeyContainer') idleMonkeyContainer: ElementRef
  @ViewChild('trackingMonkeyContainer') trackingMonkeyContainer: ElementRef

  private sub: Subscription
  inputValue: string

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

  onInput(value: string): void {
    new Promise((resolve, reject) => {
      if (!this.monkeyTracking) {
        this.monkeyIdle.addEventListener('loopComplete', () => {
          this.monkeyIdle.pause()

          this.monkeyTracking = lottie.loadAnimation({
            container: this.trackingMonkeyContainer.nativeElement,
            renderer: 'svg',
            loop: false,
            initialSegment: [0, this.monkeyTrackingCurrentFrame],
            path: '../../../assets/monkey/TwoFactorSetupMonkeyTracking.json',
          })

          this.monkeyTracking.addEventListener('DOMLoaded', () => {
            this.monkeyIdle.destroy()

            resolve(value)
          })
        })
      } else {
        resolve(value)
      }
    }).then((value: string) => {
      let nextFrame = value.length * this.frameStepSize
      nextFrame = nextFrame === 0 ? 1 : nextFrame

      this.monkeyTracking.playSegments([
        this.monkeyTrackingCurrentFrame,
        nextFrame,
      ])

      this.monkeyTrackingCurrentFrame = nextFrame
    })
  }
}
