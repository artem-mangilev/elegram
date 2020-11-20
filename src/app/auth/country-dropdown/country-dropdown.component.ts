import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'

import { Country } from './country'

import { CountryListService } from './country-list.service'
import { PhoneService } from '../phone-step/phone.service'

type CountryRenderData = Country & { emojiUrl: string }

@Component({
  selector: 'app-country-dropdown',
  templateUrl: './country-dropdown.component.html',
  styleUrls: ['./country-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDropdownComponent implements OnInit {
  countryList = this.getCountryList(this.countryListService.getCountries())
  clickInside = false
  hidden = true
  inputValue = ''

  @Input() set phone(text: string) {
    const rawPhone = this.phoneService.raw(text)
    const country = this.countryListService.filterByPhone(rawPhone)[0]
    this.inputValue = country?.name || ''
  }

  @Output() readonly countrySelect = new EventEmitter<Country>()

  @ViewChild('dropdownIcon') icon
  @ViewChild('input') input

  constructor(
    private countryListService: CountryListService,
    private phoneService: PhoneService
  ) {}

  ngOnInit(): void {}

  onCountryNameEntered(countryName: string): void {
    const filtered = this.countryListService.filterByName(countryName)
    this.countryList = this.getCountryList(filtered)
  }

  onCountrySelected({ name, code, emoji, phone }: CountryRenderData): void {
    this.inputValue = name
    this.countrySelect.emit({ name, code, emoji, phone })
  }

  onInputContainerClick(target): void {
    if (target === this.icon.nativeElement) {
      this.hidden = !this.hidden

      const input = this.input.nativeElement
      this.hidden ? input.blur() : input.focus()
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

  getCountryList(countries: Country[]): CountryRenderData[] {
    return countries.map((country) => {
      return {
        ...country,
        phone: this.phoneService.format(country.phone),
        emojiUrl: this.getEmojiUrl(country.name),
      }
    })
  }

  private getEmojiUrl(country: string): string {
    const urlName = country
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/\[|\]|'|\./g, '')
    return `../../../assets/emoji/flags/flag-${urlName}.png`
  }
}
