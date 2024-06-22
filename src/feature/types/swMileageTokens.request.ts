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

export type {
  getSwMileageTokenList as getSwMileageTokenListRequest,
  activateSwMileageToken as activateSwMileageTokenRequest,
  createSwMileageToken as createSwMileageTokenRequest,
}
