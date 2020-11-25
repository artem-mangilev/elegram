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

import lottie from 'lottie-web'

@Component({
  selector: 'app-code-step',
  templateUrl: './code-step.component.html',
  styleUrls: ['./code-step.component.scss', './../step.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeStepComponent implements OnInit, AfterViewInit, OnDestroy {
  phone = ''

  @ViewChild('imageContainer') imageContainer: ElementRef

  private sub: Subscription

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.phone = params.get('phone')
    })
  }

  ngAfterViewInit(): void {
    lottie.loadAnimation({
      container: this.imageContainer.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../../../assets/monkey/TwoFactorSetupMonkeyIdle.json',
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
