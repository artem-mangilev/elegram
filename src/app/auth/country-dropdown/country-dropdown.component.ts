import { Component, HostListener, OnInit, ViewChild } from '@angular/core'

import countryList from './country-list.json'

@Component({
  selector: 'app-country-dropdown',
  templateUrl: './country-dropdown.component.html',
  styleUrls: ['./country-dropdown.component.scss'],
})
export class CountryDropdownComponent implements OnInit {
  clickInside = false
  hidden = false
  countryList: {
    name: string
    code: string
    emoji: string
    phone: string
  }[] = countryList

  @ViewChild('dropdownIcon') icon

  constructor() {}

  ngOnInit(): void {}

  @HostListener('click', ['$event.target'])
  onInputClick(target): void {
    if (target === this.icon.nativeElement) {
      this.hidden = !this.hidden
    } else {
      this.hidden = false
    }

    this.clickInside = true
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (!this.clickInside) {
      this.hidden = true
    }

    this.clickInside = false
  }
}
