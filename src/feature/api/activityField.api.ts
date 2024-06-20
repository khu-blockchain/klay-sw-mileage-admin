import {AcademicFieldServer} from "@/feature/serverInstance";
import {API} from "@/feature";
import {getActivityFieldListRequest} from "@/feature/types/activityField.request";
import {getActivityFieldListResponse} from "@/feature/types/activityField.response";

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
