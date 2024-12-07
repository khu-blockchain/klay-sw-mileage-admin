import {SwMileageToken} from "@/store/types";

type getSwMileageTokenList = Array<SwMileageToken>
type activateSwMileageToken = SwMileageToken
type createSwMileageToken = SwMileageToken

type mintSwMileageToken = any;
type burnSwMileageToken = any;
type getSwMileageTokenRanking = any;



// sw_mileage_token_history_id
// sw_mileage_token_id
// status
// amount
// transaction_type
// admin_address
// student_address
// transaction_hash
// created_at
// updated_at

export type {
  getSwMileageTokenList as getSwMileageTokenListResponse,
  activateSwMileageToken as activateSwMileageTokenResponse,
  createSwMileageToken as createSwMileageTokenResponse,
  mintSwMileageToken as mintSwMileageTokenResponse,
  burnSwMileageToken as burnSwMileageTokenResponse,
  getSwMileageTokenRanking as getSwMileageTokenRankingResponse
}
