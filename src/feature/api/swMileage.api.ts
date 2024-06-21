import {SwMileageServer} from "@/feature/serverInstance";
import {API} from "@/feature";
import {getSwMileageListRequest} from "../types/swMileage.request";
import {getSwMileageListResponse} from "@/feature/types/swMileage.response";
import {makeQuery} from "@/feature/utils";

const getSwMileageList: API<getSwMileageListRequest, getSwMileageListResponse> = async(request) => {
  try{
    const result = await SwMileageServer.get(`${makeQuery(request.query)}`)
    return result.data;
  }catch (e) {
    throw e
  }
}


export {
  getSwMileageList as getSwMileageListAPI,
}
