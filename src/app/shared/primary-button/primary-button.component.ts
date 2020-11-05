import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
})
export class PrimaryButtonComponent implements OnInit {
  @Input() status: 'default' | 'loading' = 'loading'
  @Input() value = ''

  rippleColor = '#00000020'

  constructor() {}

  ngOnInit(): void {}
}
