import {useQuery} from "@tanstack/react-query";
import {Query} from "@/feature";
import {getSwMileageTokenListRequest} from "@/feature/types/swMileageTokens.request";
import {getSwMileageTokenListResponse} from "@/feature/types/swMileageTokens.response";
import {getSwMileageTokenListAPI} from "@/feature/api/swMileageTokens.api";
import useAdminStore from "@/store/global/useAdminStore";
import {caver} from "@/App";
import useSwMileageTokenStore from "@/store/global/useSwMileageTokenStore";

const useGetSwMileageTokenList: Query<getSwMileageTokenListRequest, getSwMileageTokenListResponse> = (args) => {
  const  {getAdmin} = useAdminStore(state => state)
  const {setKip7, setSwMileageToken} = useSwMileageTokenStore(state => state)

  return useQuery({
    queryKey: ['get-sw-mileage-token-list'],
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

export {
  useGetSwMileageTokenList,
}
