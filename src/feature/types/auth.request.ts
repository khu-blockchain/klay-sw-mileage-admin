type login = {
  body: {
    loginType: 'ADMIN';
    id: string;
    password: string;
  }
}

type refresh = {
  body: {
    refreshToken: string;
  }
}

export type {
  login as loginRequest,
  refresh as refreshRequest
}
