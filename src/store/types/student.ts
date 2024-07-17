import { JWT } from ".";

type Student = {
  student_id: string;
  name: string;
  email: string;
  phone_number: string;
  department: string;
  wallet_address: string
  bank_account_number: string;
  bank_code: string;
}

type StudentWithToken = {
  student: Student,
  tokens: JWT
}

export type {
  Student,
  StudentWithToken
}
