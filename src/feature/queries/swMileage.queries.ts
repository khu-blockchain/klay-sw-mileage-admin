import {Mutation, Query} from "@/feature";
import useAdminStore from "@/store/global/useAdminStore";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getSwMileageByIdAPI, getSwMileageListAPI, updateSwMileageStatusAPI} from "@/feature/api/swMileage.api";
import {
  getSwMileageByIdRequest,
  getSwMileageListRequest,
  updateSwMileageStatusRequest
} from "@/feature/types/swMileage.request";
import {
  getSwMileageByIdResponse,
  getSwMileageListResponse,
  updateSwMileageStatusResponse
} from "@/feature/types/swMileage.response";
import {mintSwMileageTokenRequest} from "@/feature/types/swMileageTokens.request";
import {mintSwMileageTokenResponse} from "@/feature/types/swMileageTokens.response";
import {mintSwMileageTokenAPI} from "@/feature/api/swMileageTokens.api";

const useGetSWMileageList: Query<getSwMileageListRequest, getSwMileageListResponse> = (args) => {
  const  {getAdmin} = useAdminStore(state => state)

  return useQuery({
    queryKey: ['get-sw-mileage-list'],
    queryFn: async() => await getSwMileageListAPI(args),
    initialData: [],
    enabled: getAdmin().admin_id !== -1
  })
}

const useGetSwMileageById: Query<getSwMileageByIdRequest, getSwMileageByIdResponse> = (args) => {
  return useQuery({
    queryKey: ['get-sw-mileage-by-id'],
    queryFn: async() => await getSwMileageByIdAPI(args),
    initialData: null,
    enabled: args.params.swMileageId !== null
  })
}

const useUpdateSwMileageStatus: Mutation<updateSwMileageStatusRequest, updateSwMileageStatusResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => updateSwMileageStatusAPI(data),
    ...(onSuccessFn && {onSuccess: (res: mintSwMileageTokenResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}

export {
  useGetSWMileageList,
  useGetSwMileageById,
  useUpdateSwMileageStatus
}
