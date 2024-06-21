
type JWT = [AccessToken, RefreshToken]

type AccessToken = Token; // 0
type RefreshToken = Token; // 1

enum TokenType {
  'ACCESS',
  'REFRESH'
}

type Token = {
  token: string;
  expires: string;
  token_type: number; // enum
}

type Admin = {
  admin_id: number;
  id: string;
  name: string;
  wallet_address: string;
  role: number
}

type AdminWithToken = {
  admin: Admin,
  tokens: JWT
}

export type {
  JWT,
  AccessToken,
  RefreshToken,
  Admin,
  AdminWithToken
}

export {
  TokenType
}
