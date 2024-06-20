type getSwMileageTokenList = {}
type approveSwMileageToken = {
  params: {
    swMileageTokenId: number
  }
  body: {
    studentId: string;
    rawTransaction: string;
  }
}

export type {
  getSwMileageTokenList as getSwMileageTokenListRequest,
  approveSwMileageToken as approveSwMileageTokenRequest
}
