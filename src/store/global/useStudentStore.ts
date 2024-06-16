import {create} from "zustand";
import {Nullable, StudentWithToken} from "@/store/types";

interface UserState {
  student: Nullable<StudentWithToken>;
  setStudent: (student: StudentWithToken) => void;
}

const useStudentStore = create<UserState>((set) => ({
  student: null,
  setStudent: (student) => set({student})
}))

export default useStudentStore
