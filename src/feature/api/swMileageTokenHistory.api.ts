import {API} from "@/feature";
import {SwMileageTokenHistoryServer} from "@/feature/serverInstance";
import {makeQuery} from "@/feature/utils";
import {getSwMileageTokenHistoriesRequest} from "@/feature/types/swMileageTokenHistory.request";
import {getSwMileageTokenHistoriesResponse} from "@/feature/types/swMileageTokenHistory.response";

const getSwMileageTokenHistories: API<getSwMileageTokenHistoriesRequest, getSwMileageTokenHistoriesResponse> = async(request) => {
  try{
    const result = await SwMileageTokenHistoryServer.get(`${makeQuery(request.query)}`)
    return result.data;
  }catch (e) {
    throw e
  }
}

export {
  getSwMileageTokenHistories as getSwMileageTokenHistoriesAPI,
}
