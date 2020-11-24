import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subscription } from 'rxjs'

@Component({
  selector: 'app-code-step',
  templateUrl: './code-step.component.html',
  styleUrls: ['./code-step.component.scss', './../step.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeStepComponent implements OnInit, OnDestroy {
  phone = ''

  private sub: Subscription

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.phone = params.get('phone')
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
