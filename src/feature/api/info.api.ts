import {API} from "@/feature";
import { UserServer} from "@/feature/serverInstance";
import { getAdminInfoResponse } from "../types/info.response";
import useAdminStore from "@/store/global/useAdminStore";

const getAdminInfo: API<any, getAdminInfoResponse> = async(adminId) => {
    try {
        const result = await UserServer.get(`/${adminId}`)
        const {data} : {data:getAdminInfoResponse} = result
        console.log('user data',data);
        return data
    } catch(e) {
        throw e
    }
} 

export {
    getAdminInfo as getAdminInfoAPI
}