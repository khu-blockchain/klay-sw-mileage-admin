import {useMutation, useQuery} from "@tanstack/react-query";
import {Mutation, Query} from "@/feature";
import {
  activateSwMileageTokenRequest,
  burnSwMileageTokenRequest,
  createSwMileageTokenRequest,
  getSwMileageTokenListRequest,
  getSwMileageTokenRankingRequest,
  mintSwMileageTokenRequest,
  getActivateSwmileageTokenRequest,
  addContractAdminRequest,
} from "@/feature/types/swMileageTokens.request";
import {
  activateSwMileageTokenResponse,
  burnSwMileageTokenResponse,
  createSwMileageTokenResponse,
  getSwMileageTokenListResponse,
  getSwMileageTokenRankingResponse,
  mintSwMileageTokenResponse,
  getActivateSwmileageTokenResponse,
  addContractAdminResponse,
} from "@/feature/types/swMileageTokens.response";
import {
  activateSwMileageTokenAPI,
  burnSwMileageTokenAPI,
  createSwMileageTokenAPI,
  getContractCodeAPI,
  getSwMileageTokenListAPI,
  getSwMileageTokenRankingAPI,
  mintSwMileageTokenAPI,
  getActivateSwmileageTokenAPI,
  addContractAdminAPI,
} from "@/feature/api/swMileageTokens.api";
import useAdminStore from "@/store/global/useAdminStore";
import {caver} from "@/App";
import useSwMileageTokenStore from "@/store/global/useSwMileageTokenStore";

const useGetActivateSwMileageToken: Query<getSwMileageTokenListRequest, getSwMileageTokenListResponse> = (args) => {
  const  {getAdmin} = useAdminStore(state => state)
  const {setKip7, setSwMileageToken} = useSwMileageTokenStore(state => state)

  return useQuery({
    queryKey: ['get-activate-sw-mileage-token'],
    queryFn: async() => {
      const result = await getSwMileageTokenListAPI(args)
      const activateToken = result.find(el => el.is_activated === 1);
      if(!activateToken){
        return result
      }
      setSwMileageToken(activateToken)
      setKip7(caver.kct.kip7.create(activateToken.contract_address))
      return result
    },
    enabled: getAdmin().admin_id !== -1
  })
}

const useGetSwMileageTokenRanking: Query<getSwMileageTokenRankingRequest, getSwMileageTokenRankingResponse> = (args) => {
  return useQuery({
    queryKey: ['get-sw-mileage-token-ranking'],
    queryFn: async() => {
      const data = await getSwMileageTokenRankingAPI(args)
      return data.result
    }
  })
}

const useGetContractCode: Query<any,any> = () => {
  return useQuery({
    queryKey:['get-contract-code'],
    queryFn: async() =>{
      const data = await getContractCodeAPI('')
      return data.result
    }
  })
}

const useGetSwMileageTokenList: Query<getSwMileageTokenListRequest, getSwMileageTokenListResponse> = (args) => {
  const  {getAdmin} = useAdminStore(state => state)

  return useQuery({
    queryKey: ['get-sw-mileage-token-list'],
    queryFn: async() => await getSwMileageTokenListAPI(args),
    initialData: [],
    enabled: getAdmin().admin_id !== -1
  })
}

const useActivateMileageToken: Mutation<activateSwMileageTokenRequest, activateSwMileageTokenResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => activateSwMileageTokenAPI(data),
    ...(onSuccessFn && {onSuccess: (res: activateSwMileageTokenResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}

const useGetActivateSwmileageToken: Mutation<getActivateSwmileageTokenRequest, getActivateSwmileageTokenResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => getActivateSwmileageTokenAPI(data),
    ...(onSuccessFn && {onSuccess: (res: activateSwMileageTokenResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}

const useCreateMileageToken: Mutation<createSwMileageTokenRequest, createSwMileageTokenResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => createSwMileageTokenAPI(data),
    ...(onSuccessFn && {onSuccess: (res: createSwMileageTokenResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}

const useMintMileageToken: Mutation<mintSwMileageTokenRequest, mintSwMileageTokenResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => mintSwMileageTokenAPI(data),
    ...(onSuccessFn && {onSuccess: (res: mintSwMileageTokenResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}

const useBurnMileageToken: Mutation<burnSwMileageTokenRequest, burnSwMileageTokenResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => burnSwMileageTokenAPI(data),
    ...(onSuccessFn && {onSuccess: (res: burnSwMileageTokenResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}

const useAddContractAdmin: Mutation<addContractAdminRequest, addContractAdminResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => addContractAdminAPI(data),
    ...(onSuccessFn && {onSuccess: (res: addContractAdminResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}

export {
  useGetActivateSwMileageToken,
  useGetSwMileageTokenList,
  useCreateMileageToken,
  useActivateMileageToken,
  useMintMileageToken,
  useBurnMileageToken,
  useGetSwMileageTokenRanking,
  useGetContractCode,
  useGetActivateSwmileageToken,
  useAddContractAdmin,
}
