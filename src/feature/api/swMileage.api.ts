import {SwMileageServer} from "@/feature/serverInstance";
import {API} from "@/feature";
import {getSwMileageListRequest, registerSwMileageRequest} from "../types/swMileage.request";
import {getSwMileageListResponse, registerSwMileageResponse} from "@/feature/types/swMileage.response";
import {makeQuery} from "@/feature/utils";


const registerSwMileage: API<registerSwMileageRequest, registerSwMileageResponse> = async(request) => {
  try{
    const result = await SwMileageServer.post(``, request.body)
    return result.data;
  }catch (e) {
    throw e
  }
}

const getSwMileageList: API<getSwMileageListRequest, getSwMileageListResponse> = async(request) => {
  try{
    const result = await SwMileageServer.get(`${makeQuery(request.query)}`)
    return result.data;
  }catch (e) {
    throw e
  }
}


export {
  registerSwMileage as registerSwMileageAPI,
  getSwMileageList as getSwMileageListAPI,
}
