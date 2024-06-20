import {SwMileageTokenServer} from "@/feature/serverInstance";
import {API} from "@/feature";
import {approveSwMileageTokenRequest, getSwMileageTokenListRequest} from "@/feature/types/swMileageTokens.request";
import {approveSwMileageTokenResponse, getSwMileageTokenListResponse} from "@/feature/types/swMileageTokens.response";

const getSwMileageTokenList: API<getSwMileageTokenListRequest, getSwMileageTokenListResponse> = async() => {
  try{
    const result = await SwMileageTokenServer.get('')
    return result.data;
  }catch (e) {
    throw e
  }
}

const approveSwMileageToken: API<approveSwMileageTokenRequest, approveSwMileageTokenResponse> = async(request) => {
  try{
    const result = await SwMileageTokenServer.post(`/${request.params.swMileageTokenId}/approve`, request.body)
    console.log(result)
    return result.data;
  }catch (e) {
    throw e
  }
}


export {
  getSwMileageTokenList as getSwMileageTokenListAPI,
  approveSwMileageToken as approveSwMileageTokenAPI
}
