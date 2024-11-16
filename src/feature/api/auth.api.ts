import {API} from "@/feature";
import {AuthServer, updateAuthorization} from "@/feature/serverInstance";
import {loginRequest, refreshRequest} from "@/feature/types/auth.request";
import {loginResponse, refreshResponse} from "@/feature/types/auth.response";

const login: API<loginRequest, loginResponse> = async(request) => {
  try{
    const result = await AuthServer.post(`/login`, request.body)  
    const {data}: {data: loginResponse} = result
    updateAuthorization(data.tokens[0].token)
    return data;
  }catch (e) {
    throw e
  }
}

const refresh: API<refreshRequest, refreshResponse> = async(request) => {
  try{
    const result = await AuthServer.post(`/refresh-token`, request.body)
    const {data}: {data: refreshResponse} = result
    updateAuthorization(data.tokens[0].token)
    return data;
  }catch (e) {
    throw e
  }
}

export {
  login as loginAPI,
  refresh as refreshAPI
}
