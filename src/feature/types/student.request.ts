type signUp = {
  body: {
    adminId: string
    password: string;
    passwordConfirm: string;
    name: string;
    email: string;
    phoneNumber: string;
    department: string;
    walletAddress: string;
    personalInformationConsentStatus?: number
  }
}

type getStudentInfoById = {
  params: {studentId: string}
}

type updateStudentInfo = {
  params: {studentId: string};
  body: {
    walletAddress?: string;
    bankAccountNumber?: string;
    bankCode?: string;
  }
}

export type {
  getStudentInfoById as getStudentInfoByIdRequest,
  updateStudentInfo as updateStudentInfoRequest,
  signUp as signUpRequest
}
