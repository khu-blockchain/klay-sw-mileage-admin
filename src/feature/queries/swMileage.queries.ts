import {Query} from "@/feature";
import useAdminStore from "@/store/global/useAdminStore";
import {useQuery} from "@tanstack/react-query";
import {getSwMileageListAPI} from "@/feature/api/swMileage.api";
import {getSwMileageListRequest} from "@/feature/types/swMileage.request";
import {getSwMileageListResponse} from "@/feature/types/swMileage.response";

const useGetSWMileageList: Query<getSwMileageListRequest, getSwMileageListResponse> = (args) => {
  const  {getAdmin} = useAdminStore(state => state)

  return useQuery({
    queryKey: ['get-sw-mileage-list'],
    queryFn: async() => await getSwMileageListAPI(args),
    initialData: [],
    enabled: getAdmin().admin_id !== -1
  })
}

export {
  useGetSWMileageList,
}
