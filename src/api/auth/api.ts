import {API} from "@/api";
import {AuthServer, updateAuthorization} from "@/api/serverInstance";
import {loginRequest, refreshRequest} from "@/api/auth/request";
import {loginResponse, refreshResponse} from "@/api/auth/response";

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
