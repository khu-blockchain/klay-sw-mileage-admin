import {AcademicFieldServer} from "@/api/serverInstance";
import {API} from "@/api";
import {getAcademicFieldListRequest} from "@/api/academicField/request";
import {getAcademicFieldListResponse} from "@/api/academicField/response";

const getAcademicFieldList: API<getAcademicFieldListRequest, getAcademicFieldListResponse> = async() => {
  try{
    const result = await AcademicFieldServer.get('')
    return result.data;
  }catch (e) {
    throw e
  }
}


export {
  getAcademicFieldList as getAcademicFieldListAPI
}
