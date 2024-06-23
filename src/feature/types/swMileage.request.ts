
type getSwMileageList = {
  query: {
    studentId?: string;
    status?: number;
  }
}

type getSwMileageById = {
  params: {
    swMileageId: number;
  }
}

type getSwMileageFileById = {
  params: {
    swMileageFileId: number
  }
}

export type {
  getSwMileageList as getSwMileageListRequest,
  getSwMileageById as getSwMileageByIdRequest,
  getSwMileageFileById as getSwMileageFileByIdRequest
}
