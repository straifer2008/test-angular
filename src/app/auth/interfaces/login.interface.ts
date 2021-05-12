export interface LoginInterface {
  email: string;
  password: string;
}

export interface UserInterface {
  id: number;
  email: string;
  avatar: string;
  first_name: string;
  last_name: string;
}

export interface TokenInterface {
  token: string;
}

export interface GetTokenSuccess {
  id: number;
  token: string;
}
