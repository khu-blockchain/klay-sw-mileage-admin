import {useMutation, useQuery} from "@tanstack/react-query";
import {Mutation, Query} from "@/feature";
import {
  activateSwMileageTokenRequest,
  createSwMileageTokenRequest,
  getSwMileageTokenListRequest
} from "@/feature/types/swMileageTokens.request";
import {
  activateSwMileageTokenResponse,
  createSwMileageTokenResponse,
  getSwMileageTokenListResponse
} from "@/feature/types/swMileageTokens.response";
import {
  activateSwMileageTokenAPI,
  createSwMileageTokenAPI,
  getSwMileageTokenListAPI
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

const useCreateMileageToken: Mutation<createSwMileageTokenRequest, createSwMileageTokenResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => createSwMileageTokenAPI(data),
    ...(onSuccessFn && {onSuccess: (res: createSwMileageTokenResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}



export {
  useGetActivateSwMileageToken,
  useGetSwMileageTokenList,
  useCreateMileageToken,
  useActivateMileageToken
}
