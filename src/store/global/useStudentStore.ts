import {create} from "zustand";
import {JWT, Student, StudentWithToken} from "@/store/types";

interface UserState {
  student: StudentWithToken;
  setStudent: (student: StudentWithToken) => void;
  setStudentInfo: (studentInfo: Student) => void;
  getStudent: () => Student
  getTokens: () => JWT
}
const initialStudentState = {
  student_id: '',
  name: '',
  email: '',
  phone_number: '',
  department: '',
  wallet_address: '',
  bank_account_number: '',
  bank_code: '',
}

const initialTokenState: JWT = [
  {
    token: '',
    expires: '',
    token_type: 0
  },
  {
    token: '',
    expires: '',
    token_type: 1
  }
]

const initialUserState: StudentWithToken = {
  student: initialStudentState,
  tokens: initialTokenState
}

const useStudentStore = create<UserState>((set, get) => ({
  student: initialUserState,
  setStudent: (student) => set({student}),
  setStudentInfo: (studentInfo) => set({
    student: {
      student: studentInfo,
      tokens: get().student.tokens
    }
  }),
  getStudent: () => get().student.student,
  getTokens: () => get().student.tokens
}))

export default useStudentStore
