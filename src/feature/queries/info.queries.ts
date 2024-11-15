import {useMutation, useQuery} from "@tanstack/react-query";
import {Mutation, Query} from "@/feature";
import { getAdminInfoAPI } from "../api/info.api";

const useGetAdminInfo: Mutation<any, any> = (args) => {
    const {onSuccessFn, onErrorFn} = args
    return useMutation({
        mutationFn: async () => {
            return await getAdminInfoAPI({})
        },
        ...(onSuccessFn && {onSuccess: (res: any) => onSuccessFn(res)}),
        ...(onErrorFn && {onError: (res) => onErrorFn(res)})
    })
}

export {
    useGetAdminInfo
}