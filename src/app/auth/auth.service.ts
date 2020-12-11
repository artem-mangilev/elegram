import { Injectable } from '@angular/core'

import { getSRPParams, MTProto } from '@mtproto/core'
import { MTProtoCoreService } from '../../app/shared/mtproto-core/mtproto-core.service'
import { Password, SentCode } from '../../app/shared/mtproto-core/mtproto-core'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private mtproto: MTProto
  private phoneNumber: string
  private phoneCodeHash: string

  constructor(mtprotoService: MTProtoCoreService) {
    this.mtproto = mtprotoService.instance
  }

  async setPhoneNumber(internationalPhoneNumber: string): Promise<SentCode> {
    const response = (await this.mtproto.call('auth.sendCode', {
      phone_number: internationalPhoneNumber,
      settings: {
        _: 'codeSettings',
      },
    })) as SentCode

    this.phoneNumber = internationalPhoneNumber
    this.phoneCodeHash = response.phone_code_hash

    return response
  }

  async signIn(phoneCode: string): Promise<unknown> {
    return await this.mtproto.call('auth.signIn', {
      phone_code: phoneCode,
      phone_number: this.phoneNumber,
      phone_code_hash: this.phoneCodeHash,
    })
  }

  async checkPassword(password: string): Promise<unknown> {
    const { srp_id, current_algo, srp_B } = (await this.mtproto.call(
      'account.getPassword',
      {}
    )) as Password
    const { g, p, salt1, salt2 } = current_algo

    const { A, M1 } = await getSRPParams({
      g,
      p,
      salt1,
      salt2,
      gB: srp_B,
      password,
    })

    return await this.mtproto.call('auth.checkPassword', {
      password: {
        _: 'inputCheckPasswordSRP',
        srp_id,
        A,
        M1,
      },
    })
  }
}
