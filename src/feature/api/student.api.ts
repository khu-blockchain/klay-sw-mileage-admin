import {StudentServer} from "@/feature/serverInstance";
import {API} from "@/feature";
import {getStudentInfoByIdRequest, updateStudentInfoRequest} from "@/feature/types/student.request";
import {getStudentInfoByIdResponse, updateStudentInfoResponse} from "@/feature/types/student.response";

const getStudentInfoById: API<getStudentInfoByIdRequest, getStudentInfoByIdResponse> = async(request) => {
  try{
    const result = await StudentServer.get(`/${request.params.studentId}`)
    return result.data;
  }catch (e) {
    throw e
  }
}

const updateStudentInfo: API<updateStudentInfoRequest, updateStudentInfoResponse> = async(request) => {
  try{
    const result = await StudentServer.put(`/${request.params.studentId}`, request.body)
    return result.data;
  }catch (e) {
    throw e
  }
}

export {
  getStudentInfoById as getStudentInfoByIdAPI,
  updateStudentInfo as updateStudentInfoAPI
}
