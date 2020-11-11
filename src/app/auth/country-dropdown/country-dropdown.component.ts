import { Component, HostListener, OnInit, ViewChild } from '@angular/core'

import { CountryListService } from './country-list.service'

@Component({
  selector: 'app-country-dropdown',
  templateUrl: './country-dropdown.component.html',
  styleUrls: ['./country-dropdown.component.scss'],
})
export class CountryDropdownComponent implements OnInit {
  countryList = this.countryListService.getCountries()
  clickInside = false
  hidden = false

  @ViewChild('dropdownIcon') icon

  constructor(private countryListService: CountryListService) {}

  ngOnInit(): void {}

  onCountryNameEntered(countryName: string): void {
    this.countryList = this.countryListService.filterByName(countryName)
  }

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
