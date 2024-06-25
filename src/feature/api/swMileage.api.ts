import {SwMileageServer} from "@/feature/serverInstance";
import {API} from "@/feature";
import {
  getSwMileageByIdRequest,
  getSwMileageFileByIdRequest,
  getSwMileageListRequest, updateSwMileageStatusRequest
} from "../types/swMileage.request";
import {
  getSwMileageByIdResponse,
  getSwMileageFileByIdResponse,
  getSwMileageListResponse, updateSwMileageStatusResponse
} from "@/feature/types/swMileage.response";
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

const getSwMileageFileById: API<getSwMileageFileByIdRequest, getSwMileageFileByIdResponse> = async(request) => {
  try{
    const result = await SwMileageServer.get(`${request.params.swMileageFileId}`)
    return result.data;
  }catch (e) {
    throw e
  }
}

const updateSwMileageStatus: API<updateSwMileageStatusRequest, updateSwMileageStatusResponse> = async(request) => {
  try{
    const result = await SwMileageServer.patch(`${request.params.swMileageId}/status`, request.body)
    return result.data;
  }catch (e) {
    throw e
  }
}




export {
  getSwMileageList as getSwMileageListAPI,
  getSwMileageById as getSwMileageByIdAPI,
  getSwMileageFileById as getSwMileageFileByIdAPI,
  updateSwMileageStatus as updateSwMileageStatusAPI,
}
