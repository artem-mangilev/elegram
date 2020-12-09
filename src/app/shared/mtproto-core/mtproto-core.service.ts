import { Injectable } from '@angular/core'

import { MTProto } from '@mtproto/core'

import { AppConfig } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class MTProtoCoreService {
  instance = new MTProto({
    api_id: AppConfig.apiId,
    api_hash: AppConfig.apiHash,
    test: true,
  })
}
