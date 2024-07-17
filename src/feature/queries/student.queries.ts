import {useMutation, useQuery} from "@tanstack/react-query";
import {updateStudentInfoRequest} from "@/feature/types/student.request";
import {getStudentInfoByIdAPI, updateStudentInfoAPI} from "@/feature/api/student.api";
import {Mutation, Query} from "@/feature";
import {getStudentInfoByIdResponse, updateStudentInfoResponse} from "@/feature/types/student.response";

const useGetStudentInfo: Query<string, getStudentInfoByIdResponse> = (studentId) => {
  return useQuery({
    queryKey: ['get-student-by-id', studentId],
    queryFn: async(r) => {
      const studentId = r.queryKey[1] as string;
      return await getStudentInfoByIdAPI({params: {studentId}});
    },
    retry: false,
    enabled: studentId !== ''
  })
}

const useUpdateStudentInfo: Mutation<updateStudentInfoRequest, updateStudentInfoResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => {
      return await updateStudentInfoAPI(data)
    },
    ...(onSuccessFn && {onSuccess: (res: updateStudentInfoResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}

export {
  useGetStudentInfo,
  useUpdateStudentInfo
}
