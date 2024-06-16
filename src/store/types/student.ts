import {Nullable} from "@/store/types/common";

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

type Student = {
  student_id: string;
  name: string;
  email: string;
  phone_number: string;
  department: string;
  wallet_address: Nullable<string>;
  bank_account_number: Nullable<string>;
  bank_code: Nullable<string>;
}

type StudentWithToken = {
  student: Student,
  tokens: JWT
}

export type {
  JWT,
  AccessToken,
  RefreshToken,
  Student,
  StudentWithToken
}

export {
  TokenType
}
