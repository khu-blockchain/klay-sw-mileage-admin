type signUp = {
  body: {
    studentId: string;
    password: string;
    passwordConfirm: string;
    name: string;
    email: string;
    phoneNumber: string;
    department: string;
    walletAddress: string;
    bankAccountNumber: string;
    bankCode: string;
  }
}

type getStudentInfoById = {
  params: {studentId: number}
}

type updateStudentInfo = {
  params: {studentId: number};
  body: {
    walletAddress: string;
    bankAccountNumber: string;
    bankCode: string;
  }
}

export type {
  signUp as signUpRequest,
  getStudentInfoById as getStudentInfoByIdRequest,
  updateStudentInfo as updateStudentInfoRequest,

}
