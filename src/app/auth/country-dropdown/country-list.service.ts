import { Injectable } from '@angular/core'

import { Country } from './country'
import countryList from './country-list.json'

@Injectable({
  providedIn: 'root',
})
export class CountryListService {
  private countryList: Country[] = countryList

  getCountries(): Country[] {
    return this.countryList
  }

  filterByName(nameSubstr: string): Country[] {
    const filtered = this.countryList.filter((country) =>
      country.name.toLowerCase().includes(nameSubstr.toLowerCase())
    )

    return filtered.length ? filtered : this.countryList
  }

  filterByPhone(phone: string): Country[] {
    return this.countryList.filter(
      (country) => country.phone === phone.slice(0, country.phone.length)
    )
  }
}
