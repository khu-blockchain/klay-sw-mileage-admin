import { Nullable, SwMileageToken } from "@/store/types"

type getSwMileageTokenList = {}

type getActivateSwmileageToken = {}

type activateSwMileageToken = {
  params: {
    swMileageTokenId: number
  }
}

type createSwMileageToken = {
  body: {
    swMileageTokenName: string
    description: string
    symbol: string
    imageUrl: string
    rlpEncodingString: string
  }
}

type mintSwMileageToken = {
  params: {
    swMileageTokenId: number
  },
  body: {
    studentId: string;
    amount: number,
    rawTransaction: string;
  }
}

type burnSwMileageToken = {
  params: {
    swMileageTokenId: number
  },
  body: {
    studentId: string;
    amount: number,
    rawTransaction: string;
  }
}

type getSwMileageTokenRanking = {
  params: {
    from: number;
    to: number;
  },
  body: {
    swMileageTokenId: number
  }
}

type addContractAdmin = {
  params: {
    swMileageTokenId: number;
  },
  body : {
    rawTransaction: string;
  }

}

export type {
  getSwMileageTokenList as getSwMileageTokenListRequest,
  activateSwMileageToken as activateSwMileageTokenRequest,
  createSwMileageToken as createSwMileageTokenRequest,
  mintSwMileageToken as mintSwMileageTokenRequest,
  burnSwMileageToken as burnSwMileageTokenRequest,
  getSwMileageTokenRanking as getSwMileageTokenRankingRequest,
  getActivateSwmileageToken as getActivateSwmileageTokenRequest,
  addContractAdmin as addContractAdminRequest,
}
