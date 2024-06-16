import {useMutation} from "@tanstack/react-query";
import {signUpRequest} from "@/api/student/request";
import {signUpAPI} from "@/api/student/api";
import {Mutation} from "@/api";
import {signUpResponse} from "@/api/student/response";

const useSignUp: Mutation<signUpRequest, signUpResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => signUpAPI(data),
    ...(onSuccessFn && {onSuccess: (res: signUpResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}

export {
  useSignUp
}
