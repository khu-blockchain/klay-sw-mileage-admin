import {SwMileageToken} from "@/store/types";
import {TransactionReceipt} from "caver-js/types/packages/caver-core/src";

type getSwMileageTokenList = Array<SwMileageToken>
type approveSwMileageToken = {
  result: TransactionReceipt
}

export type {
  getSwMileageTokenList as getSwMileageTokenListResponse,
  approveSwMileageToken as approveSwMileageTokenResponse
}
