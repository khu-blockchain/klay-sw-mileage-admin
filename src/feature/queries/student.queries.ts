import {useMutation} from "@tanstack/react-query";
import {signUpRequest, updateStudentInfoRequest} from "@/feature/types/student.request";
import {signUpAPI, updateStudentInfoAPI} from "@/feature/api/student.api";
import {Mutation} from "@/feature";
import {signUpResponse, updateStudentInfoResponse} from "@/feature/types/student.response";

const useSignUp: Mutation<signUpRequest, signUpResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => {
      return await signUpAPI(data)
    },
    ...(onSuccessFn && {onSuccess: (res: signUpResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
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
  useUpdateStudentInfo
}
