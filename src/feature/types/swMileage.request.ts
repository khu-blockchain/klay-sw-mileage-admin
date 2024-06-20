type registerSwMileage = {
  body: FormData;
}

type getSwMileageList = {
  query: {
    studentId?: string;
    status?: number;
  }
}

export type {
  registerSwMileage as registerSwMileageRequest,
  getSwMileageList as getSwMileageListRequest
}
