import {StudentServer, updateAuthorization, UserServer} from "@/feature/serverInstance";
import {API} from "@/feature";
import {getStudentInfoByIdRequest, signUpRequest, updateStudentInfoRequest} from "@/feature/types/student.request";
import {getStudentInfoByIdResponse, updateStudentInfoResponse} from "@/feature/types/student.response";


const signUp: API<signUpRequest, any> = async(request) => {
  try {
    const result = await UserServer.post('', request.body)
    const {data} : {data: any} = result
    console.log(data);
    return data;
  } catch(e) {
    throw e
  }
}

const updateAdminInfo: API<any, any> = async(request) => {
  const {adminId} = request.body
  try {
    const result = await UserServer.put(`${adminId}`,request.body)
    const {data} : {data:any} = result
    return data
  } catch(e) {
    throw e
  }
}

const deleteAdmin: API<any,any> = async(request) => {
  const {adminId} = request.body
  try {
    const result = await UserServer.delete(`${adminId}`)
    const {data} : {data:any} = result
    return data
  } catch(e) {
    throw e
  }
}

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
  signUp as signUpAPI,
  getStudentInfoById as getStudentInfoByIdAPI,
  updateStudentInfo as updateStudentInfoAPI,
  updateAdminInfo as updateAdminInfoAPI,
  deleteAdmin as deleteAdminAPI
}
