import {create} from "zustand";
import {ActivityField, Nullable} from "@/store/types";

interface ActivityFieldState {
  activityFields: Nullable<ActivityField>
  setActivityFields: (activityFields: ActivityField) => void;
  getActivityCategories: () => Array<keyof ActivityField>
}

const useActivityFieldStore = create<ActivityFieldState>((set, get) => ({
  activityFields: null,
  setActivityFields: (activityFields) => set({activityFields}),
  getActivityCategories: () => {
    const allFields = get().activityFields;
    if(!allFields) return [];
    return Object.keys(allFields);
  },
}))

export default useActivityFieldStore
