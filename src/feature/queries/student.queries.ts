import {useMutation} from "@tanstack/react-query";
import {signUpRequest} from "@/feature/types/student.request";
import {signUpAPI} from "@/feature/api/student.api";
import {Mutation} from "@/feature";
import {signUpResponse} from "@/feature/types/student.response";

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

export {
  useSignUp
}
