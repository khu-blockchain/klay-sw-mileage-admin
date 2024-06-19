import {SwMileageTokenServer} from "@/api/serverInstance";
import {API} from "@/api";
import {approveSwMileageTokenRequest, getSwMileageTokenListRequest} from "@/api/sw_mileage_tokens/request";
import {approveSwMileageTokenResponse, getSwMileageTokenListResponse} from "@/api/sw_mileage_tokens/response";

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
