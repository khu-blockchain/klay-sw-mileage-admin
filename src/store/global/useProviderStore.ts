import {Nullable} from "@/store/types";
import {create} from "zustand";
import Caver, {KIP7} from "caver-js";

interface ProviderState {
  provider: Nullable<any>,
  caver: Caver,
  kip7: Nullable<KIP7>,
  setProvider: (provider: any) => void
  setCaver: (caver: Caver) => void
  setKip7: (kip7: KIP7) => void
}

const useProviderStore = create<ProviderState>((set) => ({
  provider: null,
  caver: new Caver(),
  kip7: null,
  setProvider: (provider) => set({provider}),
  setCaver: (caver: Caver) => set({caver}),
  setKip7: (kip7: KIP7) => set({kip7}),
}))

export default useProviderStore
