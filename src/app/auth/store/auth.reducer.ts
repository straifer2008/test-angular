import {AuthStoreInterface} from '../interfaces/auth.store.interface';
import {createReducer, on} from '@ngrx/store';
import {authErrorAction, loginAction, logoutAction, setUserAction} from './auth.actions';

export const AUTH_NODE = 'auth';

const initialState: AuthStoreInterface = {
  token: null,
  isLogged: false,
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(setUserAction, (state, user) => ({ ...state, user, error: null })),
  on(loginAction, (state, { token }) => ({ ...state, token, isLogged: !!token, error: null })),
  on(authErrorAction, (state, { message }) => ({ ...state, error: message })),
  on(logoutAction, () => initialState),
);
