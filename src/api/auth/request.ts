type login = {
  query: {
    loginType: 'STUDENT'
  };
  body: {
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
