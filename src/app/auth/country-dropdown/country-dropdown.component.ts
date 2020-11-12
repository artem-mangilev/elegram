import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core'
import { Country } from './country'

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
  inputValue = ''

  @Output() readonly countrySelect = new EventEmitter<Country>()

  @ViewChild('dropdownIcon') icon

  constructor(private countryListService: CountryListService) {}

  ngOnInit(): void {}

  onCountryNameEntered(countryName: string): void {
    this.countryList = this.countryListService.filterByName(countryName)
  }

  onCountrySelected(country: Country): void {
    this.inputValue = country.name
    this.countrySelect.emit(country)
  }

  onInputContainerClick(target): void {
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

  getEmojiUrl(country: string): string {
    const urlName = country
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/\[|\]|'|\./g, '')
    return `../../../assets/emoji/flags/flag-${urlName}.png`
  }
}
