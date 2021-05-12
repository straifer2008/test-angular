import {UserInterface} from './login.interface';

export interface AuthStoreInterface {
  user: UserInterface;
  token: string;
  isLogged: boolean;
  error: string;
}
