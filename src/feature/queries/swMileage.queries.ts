import {useMutation, useQuery} from "@tanstack/react-query";
import {Mutation, Query} from "@/feature";
import {registerSwMileageRequest} from "@/feature/types/swMileage.request";
import {getSwMileageListResponse, registerSwMileageResponse} from "@/feature/types/swMileage.response";
import {getSwMileageListAPI, registerSwMileageAPI} from "@/feature/api/swMileage.api";
import {Empty} from "@/store/types";
import useStudentStore from "@/store/global/useStudentStore";

const useRegisterSwMileage: Mutation<registerSwMileageRequest, registerSwMileageResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => {
      return await registerSwMileageAPI(data)
    },
    ...(onSuccessFn && {onSuccess: (res: registerSwMileageResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}

const useGetSwMileageList: Query<Empty, getSwMileageListResponse> = (args) => {
  const  {getStudent} = useStudentStore(state => state)

  return useQuery({
    queryKey: ['get-sw-mileage-list'],
    queryFn: async() => await getSwMileageListAPI({
      query: {
        studentId: getStudent().student_id
      }
    }),
    initialData: [],
    enabled: getStudent().student_id !== ''
  })
}


export {
  useRegisterSwMileage,
  useGetSwMileageList
}
