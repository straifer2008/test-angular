import {userReducer} from './user/reducer';
import {userKey} from './user/interfaces';

export const reducers = {
  [userKey]: userReducer,
};
