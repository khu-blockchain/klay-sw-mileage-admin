import {useMutation} from "@tanstack/react-query";
import {loginRequest, refreshRequest} from "@/feature/types/auth.request";
import {loginAPI, refreshAPI} from "@/feature/api/auth.api";
import {Mutation} from "@/feature";
import {loginResponse, refreshResponse} from "@/feature/types/auth.response";

const useLogin: Mutation<loginRequest, loginResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => loginAPI(data),
    ...(onSuccessFn && {onSuccess: (res: loginResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}

const useRefresh: Mutation<refreshRequest, refreshResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data: refreshRequest) => {
      return await refreshAPI(data)
    },
    ...(onSuccessFn && {onSuccess: (res: refreshResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}


export {
  useLogin,
  useRefresh
}
