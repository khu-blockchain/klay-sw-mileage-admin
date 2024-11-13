import {create} from "zustand";

interface SignUpState {
  state: {
    adminId: string;
    password: string;
    passwordConfirm: string;
    name: string;
    email: string;
    phoneNumber: string;
    department: string;
    walletAddress: string;
  }
  setState: (field: keyof SignUpState["state"], value: string) => void;
  reset: () => void
}

const initialState = {
  adminId: '',
  password: '',
  passwordConfirm: '',
  name: '',
  email: '',
  phoneNumber: '',
  department: '',
  walletAddress: '',
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
