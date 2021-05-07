export interface IUserAuth0 {
  picture: string;
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  family_name: string;
  given_name: string;
  locale: string;
}

export interface IUser {
  id: number;
  email: string;
  avatar: string;
  first_name: string;
  last_name: string;
}

export interface IToken {
  token: string;
}

export interface IRegister {
  email: string;
  password: string;
}

export interface IRegisterSuccess {
  id: number;
  token: string;
}
