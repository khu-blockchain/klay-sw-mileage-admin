import {AcademicFieldServer} from "@/api/serverInstance";
import {API} from "@/api";
import {getActivityFieldListRequest} from "@/api/activity_field/request";
import {getActivityFieldListResponse} from "@/api/activity_field/response";

const getActivityFieldList: API<getActivityFieldListRequest, getActivityFieldListResponse> = async() => {
  try{
    const result = await AcademicFieldServer.get('')
    return result.data;
  }catch (e) {
    throw e
  }
}


export {
  getActivityFieldList as getActivityFieldListAPI
}
