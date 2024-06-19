import {useMutation, useQuery} from "@tanstack/react-query";
import {Mutation, Query} from "@/api";
import {approveSwMileageTokenRequest, getSwMileageTokenListRequest} from "@/api/sw_mileage_tokens/request";
import {approveSwMileageTokenResponse, getSwMileageTokenListResponse} from "@/api/sw_mileage_tokens/response";
import {approveSwMileageTokenAPI, getSwMileageTokenListAPI} from "@/api/sw_mileage_tokens/api";

const useGetSwMileageTokenList: Query<getSwMileageTokenListRequest, getSwMileageTokenListResponse> = (args) => {
  return useQuery({
    queryKey: ['get-sw-mileage-tokens'],
    queryFn: async() => await getSwMileageTokenListAPI(args)
  })
}

const useApproval: Mutation<approveSwMileageTokenRequest, approveSwMileageTokenResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => {
      return await approveSwMileageTokenAPI(data)
    },
    ...(onSuccessFn && {onSuccess: (res: approveSwMileageTokenResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}


export {
  useGetSwMileageTokenList,
  useApproval
}
