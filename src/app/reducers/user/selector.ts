import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IUserState, userKey} from './interfaces';

// tslint:disable-next-line:no-namespace
export namespace UserSelectors {
  export const state = createFeatureSelector<IUserState>(userKey);

  export const getToken = createSelector(state, ({ token }) => token);
}
