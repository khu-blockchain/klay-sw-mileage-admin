import { Nullable, SwMileageToken } from "@/store/types"

type getSwMileageTokenList = {}

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
  }
}

type mintSwMileageToken = {
  params: {
    swMileageTokenId: number
  },
  body: {
    studentId: string;
    amount: number
  }
}

type burnSwMileageToken = {
  params: {
    swMileageTokenId: number
  },
  body: {
    studentId: string;
    amount: number
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

export type {
  getSwMileageTokenList as getSwMileageTokenListRequest,
  activateSwMileageToken as activateSwMileageTokenRequest,
  createSwMileageToken as createSwMileageTokenRequest,
  mintSwMileageToken as mintSwMileageTokenRequest,
  burnSwMileageToken as burnSwMileageTokenRequest,
  getSwMileageTokenRanking as getSwMileageTokenRankingRequest
}
