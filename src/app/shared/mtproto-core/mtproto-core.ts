export interface SentCode {
  phone_code_hash: string
}

export interface Password {
  srp_B: Uint8Array
  srp_id: string
  current_algo: CurrentAlgo
}

export interface CurrentAlgo {
  g: number
  p: Uint8Array
  salt1: Uint8Array
  salt2: Uint8Array
}
