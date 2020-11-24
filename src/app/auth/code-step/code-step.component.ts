import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-code-step',
  templateUrl: './code-step.component.html',
  styleUrls: ['./code-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeStepComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
