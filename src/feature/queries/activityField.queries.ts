import {useQuery} from "@tanstack/react-query";
import {Query} from "@/feature";
import {getActivityFieldListRequest} from "@/feature/types/activityField.request";
import {getActivityFieldListResponse} from "@/feature/types/activityField.response";
import {getActivityFieldListAPI} from "@/feature/api/activityField.api";
import useStudentStore from "@/store/global/useStudentStore";
import useActivityFieldStore from "@/store/global/useActivityFieldStore";

const useGetActivityField: Query<getActivityFieldListRequest, getActivityFieldListResponse> = (args) => {
  const  {getStudent} = useStudentStore(state => state)
  const {setActivityFields} = useActivityFieldStore(state => state)

  return useQuery({
    queryKey: ['get-activity-field'],
    queryFn: async() => {
      const result = await getActivityFieldListAPI(args);
      setActivityFields(result);
      return result
    },
    enabled: getStudent().student_id !== ''
  })
}


export {
  useGetActivityField,
}
