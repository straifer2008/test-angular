import {createAction, props} from '@ngrx/store';
import {IRegister, IUser} from '../../shared/interfaces/auth';

// tslint:disable-next-line:no-namespace
export namespace UserActions {
  export const setToken = createAction(
    'SET_TOKEN',
    props<{ token: string }>()
  );

  export const loginUser = createAction(
    'LOGIN_USER',
    props<IRegister>()
  );

  export const loginUserSuccess = createAction(
    'LOGIN_USER_SUCCESS',
    props<IUser>()
  );
}
