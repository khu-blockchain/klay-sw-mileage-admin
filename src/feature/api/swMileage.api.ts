import {SwMileageServer} from "@/feature/serverInstance";
import {API} from "@/feature";
import {getSwMileageByIdRequest, getSwMileageListRequest} from "../types/swMileage.request";
import {getSwMileageByIdResponse, getSwMileageListResponse} from "@/feature/types/swMileage.response";
import {makeQuery} from "@/feature/utils";

const getSwMileageList: API<getSwMileageListRequest, getSwMileageListResponse> = async(request) => {
  try{
    const result = await SwMileageServer.get(`${makeQuery(request.query)}`)
    return result.data;
  }catch (e) {
    throw e
  }
}

const getSwMileageById: API<getSwMileageByIdRequest, getSwMileageByIdResponse> = async(request) => {
  try{
    const result = await SwMileageServer.get(`${request.params.swMileageId}`)
    return result.data;
  }catch (e) {
    throw e
  }
}

const getSwMileageFileById: API<getSwMileageByIdRequest, getSwMileageByIdResponse> = async(request) => {
  try{
    const result = await SwMileageServer.get(`${request.params.swMileageId}`)
    return result.data;
  }catch (e) {
    throw e
  }
}




export {
  getSwMileageList as getSwMileageListAPI,
  getSwMileageById as getSwMileageByIdAPI,
}
