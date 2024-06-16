import {create} from "zustand";

interface SignUpState {
  state: {
    studentId: string;
    password: string;
    confirmPassword: string;
    name: string;
    email: string;
    phoneNumber: string;
    department: string;
    walletAddress: string;
    bankAccountNumber: string;
    bankCode: string;
  }
  setState: (field: keyof SignUpState["state"], value: string) => void;
  reset: () => void
}

const initialState = {
  studentId: '',
  password: '',
  confirmPassword: '',
  name: '',
  email: '',
  phoneNumber: '',
  department: '',
  walletAddress: '',
  bankAccountNumber: '',
  bankCode: '',
};

const useSignUpStore = create<SignUpState>((set) => ({
  state: initialState,
  setState: (field, value) => set((state) => ({
    state: {
      ...state.state,
      [field]: value,
    },
  })),
  reset: () => set({ state: initialState }),
}))

export default useSignUpStore
