import {SwMileageTokenServer} from "@/feature/serverInstance";
import {API} from "@/feature";
import {
  activateSwMileageTokenRequest, burnSwMileageTokenRequest,
  createSwMileageTokenRequest,
  getSwMileageTokenListRequest, mintSwMileageTokenRequest
} from "@/feature/types/swMileageTokens.request";
import {
  activateSwMileageTokenResponse, burnSwMileageTokenResponse,
  createSwMileageTokenResponse,
  getSwMileageTokenListResponse, mintSwMileageTokenResponse
} from "@/feature/types/swMileageTokens.response";

const getSwMileageTokenList: API<getSwMileageTokenListRequest, getSwMileageTokenListResponse> = async() => {
  try{
    const result = await SwMileageTokenServer.get('')
    return result.data;
  }catch (e) {
    throw e
  }
}

const activateSwMileageToken: API<activateSwMileageTokenRequest, activateSwMileageTokenResponse> = async(request) => {
  try{
    const result = await SwMileageTokenServer.post(`${request.params.swMileageTokenId}/activate`)
    return result.data;
  }catch (e) {
    throw e
  }
}

const createSwMileageToken: API<createSwMileageTokenRequest, createSwMileageTokenResponse> = async(request) => {
  try{
    const result = await SwMileageTokenServer.post(``, request.body)
    return result.data;
  }catch (e) {
    throw e
  }
}

const mintSwMileageToken: API<mintSwMileageTokenRequest, mintSwMileageTokenResponse> = async(request) => {
  try{
    const result = await SwMileageTokenServer.post(`${request.params.swMileageTokenId}/mint`, request.body)
    return result.data;
  }catch (e) {
    throw e
  }
}

const burnSwMileageToken: API<burnSwMileageTokenRequest, burnSwMileageTokenResponse> = async(request) => {
  try{
    const result = await SwMileageTokenServer.post(`${request.params.swMileageTokenId}/burn-from`, request.body)
    return result.data;
  }catch (e) {
    throw e
  }
}

export {
  getSwMileageTokenList as getSwMileageTokenListAPI,
  activateSwMileageToken as activateSwMileageTokenAPI,
  createSwMileageToken as createSwMileageTokenAPI,
  mintSwMileageToken as mintSwMileageTokenAPI,
  burnSwMileageToken as burnSwMileageTokenAPI,
}
