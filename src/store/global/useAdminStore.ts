import {create} from "zustand";
import {JWT, Admin, AdminWithToken} from "@/store/types";

interface AdminState {
  admin: AdminWithToken;
  setAdmin: (admin: AdminWithToken) => void;
  setAdminInfo: (adminInfo: Admin) => void;
  getAdmin: () => Admin
  getTokens: () => JWT
}
const initialStudentState = {
  admin_id: -1,
  id: '',
  name: '',
  wallet_address: '',
  role: -1,
  email: '',
  phone_number: '',
  department: ''
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

const initialUserState: AdminWithToken = {
  admin: initialStudentState,
  tokens: initialTokenState
}

const useAdminStore = create<AdminState>((set, get) => ({
  admin       : initialUserState,
  setAdmin    : (admin) => set({admin}),
  setAdminInfo: (adminInfo) => set({
    admin: {
      admin: adminInfo,
      tokens: get().admin.tokens
    }
  }),
  getAdmin    : () => get().admin.admin,
  getTokens   : () => get().admin.tokens
}))

export default useAdminStore
