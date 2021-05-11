import {IUserState} from './interfaces';
import {createReducer, on} from '@ngrx/store';
import {UserActions} from './actions';

const initialState: IUserState = {
  token: null,
  avatar: null,
  first_name: null,
  last_name: null,
  id: null,
  email: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.setToken, (state, { token }) => ({ ...state, token })),
  on(UserActions.loginUserSuccess, (state, data) => ({
    ...state,
    ...data
  }))
);
