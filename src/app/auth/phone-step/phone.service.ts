import { Injectable } from '@angular/core'

import { AsYouType } from 'libphonenumber-js'

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  instance = new AsYouType()

  format(text: string): string {
    if (text[0] && text[0] !== '+') text = `+${text}`

    this.instance.reset()
    return this.instance.input(text)
  }

  unformat(text: string): string {
    return text.replace(/\D/g, '')
  }
}
