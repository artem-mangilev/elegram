import { Injectable } from '@angular/core'

import { MTProto } from '@mtproto/core'

import { AppConfig } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private mtproto: MTProto
  private phoneNumber: string
  private phoneCodeHash: string

  constructor() {
    this.mtproto = new MTProto({
      api_id: AppConfig.apiId,
      api_hash: AppConfig.apiHash,
      test: true,
    })
  }

  setPhoneNumber(internationalPhoneNumber: string): Promise<unknown> {
    return this.mtproto
      .call('auth.sendCode', {
        phone_number: internationalPhoneNumber,
        settings: {
          _: 'codeSettings',
        },
      })
      .then((response) => {
        console.log(response)

        this.phoneNumber = internationalPhoneNumber
        this.phoneCodeHash = response.phone_code_hash
      })
  }

  signIn(phoneCode: string): Promise<unknown> {
    return this.mtproto
      .call('auth.signIn', {
        phone_code: phoneCode,
        phone_number: this.phoneNumber,
        phone_code_hash: this.phoneCodeHash,
      })
      .then((response) => {
        console.log(response)
      })
  }
}
