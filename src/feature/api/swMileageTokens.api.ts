import {SwMileageTokenServer} from "@/feature/serverInstance";
import {API} from "@/feature";
import {
  activateSwMileageTokenRequest, burnSwMileageTokenRequest,
  createSwMileageTokenRequest,
  getSwMileageTokenListRequest, getSwMileageTokenRankingRequest, mintSwMileageTokenRequest
} from "@/feature/types/swMileageTokens.request";
import {
  activateSwMileageTokenResponse, burnSwMileageTokenResponse,
  createSwMileageTokenResponse,
  getSwMileageTokenListResponse, getSwMileageTokenRankingResponse, mintSwMileageTokenResponse
} from "@/feature/types/swMileageTokens.response";
import { log } from "console";
import useSwMileageTokenStore from "@/store/global/useSwMileageTokenStore";

const getSwMileageTokenList: API<getSwMileageTokenListRequest, getSwMileageTokenListResponse> = async() => {
  try{
    const result = await SwMileageTokenServer.get('')
    return result.data;
  }catch (e) {
    throw e
  }
}

const getContractCode: API<any, any> = async() => {
  try{
    const result = await SwMileageTokenServer.get('/contract-code')
    return result.data
  } catch(e) {
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

const getSwMileageTokenRanking: API<getSwMileageTokenRankingRequest, getSwMileageTokenRankingResponse> = async(request) => {
  const {from, to} = request.params
  const {swMileageTokenId} = request.body
  try {
    const result = await SwMileageTokenServer.get(
      `/${swMileageTokenId}/ranking`,
      {
        params: {
          from,
          to,
        },
      }
    );
    return result.data;
  } catch (e) {
    throw e
  }
}


export {
  getSwMileageTokenList as getSwMileageTokenListAPI,
  activateSwMileageToken as activateSwMileageTokenAPI,
  createSwMileageToken as createSwMileageTokenAPI,
  mintSwMileageToken as mintSwMileageTokenAPI,
  burnSwMileageToken as burnSwMileageTokenAPI,
  getSwMileageTokenRanking as getSwMileageTokenRankingAPI,
  getContractCode as getContractCodeAPI
}
