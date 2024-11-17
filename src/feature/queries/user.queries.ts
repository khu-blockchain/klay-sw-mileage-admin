import {useMutation, useQuery} from "@tanstack/react-query";
import {updateStudentInfoRequest, signUpRequest} from "@/feature/types/student.request";
import {getStudentInfoByIdAPI, signUpAPI, updateAdminInfoAPI, updateStudentInfoAPI} from "@/feature/api/user.api";
import {Mutation, Query} from "@/feature";
import {getStudentInfoByIdResponse, updateStudentInfoResponse} from "@/feature/types/student.response";

const useSignUp: Mutation<signUpRequest, any> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => {
      return await signUpAPI(data)
    },
    ...(onSuccessFn && {onSuccess: (res: any) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}

const useUpdateAdminInfo: Mutation<any, any> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => {
      return await updateAdminInfoAPI(data)
    },
    ...(onSuccessFn && {onSuccess: (res: any) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}

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
  useSignUp,
  useGetStudentInfo,
  useUpdateStudentInfo,
  useUpdateAdminInfo
}
