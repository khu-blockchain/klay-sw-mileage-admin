import {useQuery} from "@tanstack/react-query";
import {Query} from "@/api";
import {getActivityFieldListRequest} from "@/api/activity_field/request";
import {getActivityFieldListResponse} from "@/api/activity_field/response";
import {getActivityFieldListAPI} from "@/api/activity_field/api";

const useGetActivityField: Query<getActivityFieldListRequest, getActivityFieldListResponse> = (args) => {
  return useQuery({
    queryKey: ['get-activity-field'],
    queryFn: async() => await getActivityFieldListAPI(args)
  })
}


export {
  useGetActivityField,
}
