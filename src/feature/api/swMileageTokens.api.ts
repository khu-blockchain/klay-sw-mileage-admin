import {SwMileageTokenServer} from "@/feature/serverInstance";
import {API} from "@/feature";
import {getSwMileageTokenListRequest} from "@/feature/types/swMileageTokens.request";
import {getSwMileageTokenListResponse} from "@/feature/types/swMileageTokens.response";

const getSwMileageTokenList: API<getSwMileageTokenListRequest, getSwMileageTokenListResponse> = async() => {
  try{
    const result = await SwMileageTokenServer.get('')
    return result.data;
  }catch (e) {
    throw e
  }
}

export {
  getSwMileageTokenList as getSwMileageTokenListAPI,
}
