import {useQuery} from "@tanstack/react-query";
import {Query} from "@/feature";
import useAdminStore from "@/store/global/useAdminStore";
import {getSwMileageTokenHistoriesRequest} from "@/feature/types/swMileageTokenHistory.request";
import {getSwMileageTokenHistoriesResponse} from "@/feature/types/swMileageTokenHistory.response";
import {getSwMileageTokenHistoriesAPI} from "@/feature/api/swMileageTokenHistory.api";

const useGetMintHistories: Query<getSwMileageTokenHistoriesRequest, getSwMileageTokenHistoriesResponse> = (args) => {
  const {getAdmin} = useAdminStore(state => state)

  return useQuery({
    queryKey: ['get-mint-histories'],
    queryFn : async () => await getSwMileageTokenHistoriesAPI({
      query: {
        ...args.query,
      }
    }),
    enabled : getAdmin().admin_id !== -1
  })
}


const useGetBurnHistories: Query<getSwMileageTokenHistoriesRequest, getSwMileageTokenHistoriesResponse> = (args) => {
  const {getAdmin} = useAdminStore(state => state)

  return useQuery({
      queryKey   : ['get-burn-histories'],
      queryFn    : async () => await getSwMileageTokenHistoriesAPI({
        query: {
          ...args.query,
        }
      }),
      enabled    : getAdmin().admin_id !== -1
    }
  )
}


export {
  useGetMintHistories,
  useGetBurnHistories,
}
