import {createAction, props} from '@ngrx/store';
import {LoginInterface, TokenInterface, UserInterface} from '../interfaces/login.interface';

export const authTypes = {
  login: '[AUTH] LOGIN',
  loginSuccess: '[AUTH] LOGIN_SUCCESS',
  logout: '[AUTH] LOGOUT',
  register: '[AUTH] REGISTER',
  registerSuccess: '[AUTH] REGISTER_SUCCESS',
  getToken: '[AUTH] GET_TOKEN',
  getTokenSuccess: '[AUTH] GET_TOKEN_SUCCESS',
  setToken: '[AUTH] SET_TOKEN',
  getUser: '[AUTH] GET_USER',
  getUserSuccess: '[AUTH] GET_USER_SUCCESS',
  setUser: '[AUTH] SET_USER',
  authError: '[AUTH] ERROR'
};

export const loginAction = createAction(
  authTypes.login,
  props<TokenInterface>()
);

export const getTokenAction = createAction(
  authTypes.getToken,
  props<LoginInterface>()
);

export const getUserAction = createAction(
  authTypes.getUser,
  props<TokenInterface>()
);

export const setUserAction = createAction(
  authTypes.setUser,
  props<UserInterface>()
);

export const authErrorAction = createAction(
  authTypes.authError,
  props<{ message }>()
);

export const logoutAction = createAction(
  authTypes.logout
);

